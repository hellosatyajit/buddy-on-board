import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const resendApiKey = Deno.env.get("RESEND_API_KEY")!;
const appUrl = Deno.env.get("PUBLIC_APP_URL")!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const resend = new Resend(resendApiKey);

interface EmailQueueMessage {
  userId: string;
  title: string;
  message: string;
  actionUrl?: string;
  notificationId: string;
}

async function processEmailQueue() {
  try {
    const { data: message, error } = await supabase.rpc("pgmq_consume", {
      queue_name: "email_notifications",
      visibility_timeout: 30, // seconds
    });

    if (error) throw error;
    if (!message) {
      return new Response("No messages in queue", { status: 200 });
    }

    const emailMessage = message.message_body as EmailQueueMessage;

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("email")
      .eq("id", emailMessage.userId)
      .single();

    if (userError || !user?.email) {
      throw new Error(`User not found or no email: ${userError?.message}`);
    }

    await resend.emails.send({
      from: "Buddy On Board <notifications@buddyonboard.co>",
      to: user.email,
      subject: emailMessage.title,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #000; font-size: 24px; text-align: center; margin: 30px 0;">
            ${emailMessage.title}
          </h1>
          <p style="color: #000; font-size: 14px; line-height: 24px;">
            ${emailMessage.message}
          </p>
          ${
            emailMessage.actionUrl
              ? `
            <div style="text-align: center; margin: 32px 0;">
              <a
                href="${appUrl}${emailMessage.actionUrl}"
                style="background: #000; color: #fff; padding: 12px 24px; border-radius: 4px; text-decoration: none; font-size: 14px;"
              >
                View Details
              </a>
            </div>
          `
              : ""
          }
          <p style="color: #666; font-size: 12px; line-height: 24px;">
            This email was sent from TravelBuddy. If you'd rather not receive these emails,
            you can <a href="{{unsubscribe_url}}" style="color: #0066cc;">unsubscribe here</a>.
          </p>
        </div>
      `,
    });

    await supabase
      .from("notifications")
      .update({
        emailStatus: "sent",
        emailSentAt: new Date().toISOString(),
      })
      .eq("id", emailMessage.notificationId);

    await supabase.rpc("pgmq_delete", {
      queue_name: "email_notifications",
      message_id: message.message_id,
    });

    return new Response("Email sent successfully", { status: 200 });
  } catch (error) {
    console.error("Error processing email queue:", error);
    return new Response(error.message, { status: 500 });
  }
}

serve(processEmailQueue); 