import { createClient } from '@supabase/supabase-js';
import { NotificationEmail } from '@/components/emails/notification-email';
import { Resend } from 'resend';

// Initialize Supabase client for queue operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Structure of messages in the email notification queue.
 * Each message contains user info and notification details.
 */
interface EmailQueueMessage {
  userId: string;
  title: string;
  message: string;
  actionUrl?: string;
  notificationId: string;
}

/**
 * Adds an email notification to the PGMQ queue for asynchronous processing.
 * Uses Supabase's RPC to interact with the PostgreSQL-based message queue.
 * 
 * @throws Error if queue operation fails
 */
export async function enqueueEmail(message: EmailQueueMessage) {
  try {
    // Add message to the email_notifications queue
    await supabase.rpc('pgmq_produce', {
      queue_name: 'email_notifications',
      message_body: message,
    });
  } catch (error) {
    console.error('Error enqueueing email:', error);
    throw error;
  }
}

/**
 * Long-running worker that processes the email notification queue.
 * - Polls queue with visibility timeout to prevent duplicate processing
 * - Sends emails via Resend with React templates
 * - Updates notification status in database
 * - Implements error handling and retry mechanism
 * 
 * Note: This should run in a separate worker process/container
 */
export async function processEmailQueue() {
  while (true) {
    try {
      // Get the next message from the queue with a 30-second visibility timeout
      const { data: message, error } = await supabase.rpc('pgmq_consume', {
        queue_name: 'email_notifications',
        visibility_timeout: 30, // seconds
      });

      if (error) throw error;
      if (!message) {
        // No messages in queue, wait before checking again
        await new Promise(resolve => setTimeout(resolve, 1000));
        continue;
      }

      const emailMessage = message.message_body as EmailQueueMessage;

      // Get user's email
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('email')
        .eq('id', emailMessage.userId)
        .single();

      if (userError || !user?.email) {
        throw new Error(`User not found or no email: ${userError?.message}`);
      }

      // Send email using Resend
      await resend.emails.send({
        from: 'TravelBuddy <notifications@travelbuddy.com>',
        to: user.email,
        subject: emailMessage.title,
        react: NotificationEmail({
          title: emailMessage.title,
          message: emailMessage.message,
          actionUrl: emailMessage.actionUrl ? `${process.env.NEXT_PUBLIC_APP_URL}${emailMessage.actionUrl}` : undefined,
        }),
      });

      // Update notification status
      await supabase
        .from('notifications')
        .update({
          emailStatus: 'sent',
          emailSentAt: new Date().toISOString(),
        })
        .eq('id', emailMessage.notificationId);

      // Delete the message from the queue after successful processing
      await supabase.rpc('pgmq_delete', {
        queue_name: 'email_notifications',
        message_id: message.message_id,
      });

    } catch (error) {
      console.error('Error processing email queue:', error);
      // Wait before retrying on error
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
} 