type FAQ = {
  id: number;
  category:
    | "General"
    | "Travel Buddy Services"
    | "Buddy Courier Services"
    | "Payments and Refunds"
    | "Support"
    | "Buddies";
  question: string;
  answer: string;
};

export const faqs: FAQ[] = [
  {
    id: 1,
    category: "General",
    question: "What is Buddy On Board?",
    answer:
      "Buddy On Board is a platform that connects travelers with trusted companions or buddy couriers to make travel stress-free and convenient. Whether you’re seeking a travel buddy or need to send items with a verified traveler, our platform ensures safety, flexibility, and peace of mind.",
  },
  {
    id: 2,
    category: "General",
    question: "How does Buddy On Board ensure user safety?",
    answer:
      "All users are verified through a secure identity verification process using government-issued IDs. This ensures that everyone offering Buddy Services on the platform is thoroughly vetted.",
  },
  {
    id: 3,
    category: "General",
    question: "Is Buddy On Board available globally?",
    answer:
      "While we aim for a global reach, our platform is currently available for travelers and senders in North America and Asia. You can connect with Travel Buddies or Buddy Couriers traveling to or from your desired destination within these two continents.",
  },
  {
    id: 4,
    category: "General",
    question: "Do I need to pay to use the platform?",
    answer:
      "Creating an account and browsing profiles is free. However, services such as finding a Travel Buddy or a Buddy Courier involve a nominal fee.",
  },
  {
    id: 5,
    category: "Travel Buddy Services",
    question: "How do I find a travel companion?",
    answer:
      "Simply input your travel details, such as destination and dates, and browse verified profiles. Use filters to match with companions based on preferences like language and gender.",
  },
  {
    id: 6,
    category: "Travel Buddy Services",
    question: "Can I choose a companion based on my preferences?",
    answer:
      "Yes, our platform allows you to filter companions based on your specific preferences such as language and gender, ensuring a comfortable and flexible travel experience.",
  },
  {
    id: 7,
    category: "Travel Buddy Services",
    question:
      "What happens after I narrow down my search for travel companions?",
    answer:
      "After narrowing your search, you can send requests to multiple travel companions of your choice. If a Travel Buddy accepts your request, you will receive notifications through the app and via email.",
  },
  {
    id: 8,
    category: "Travel Buddy Services",
    question: "What happens after I match with a travel companion?",
    answer:
      "Once your request is accepted, payment button will be enabled in the Travel Buddy’s profile. After the payment is completed, you can coordinate directly through our in-app messaging system to plan your journey.",
  },
  {
    id: 9,
    category: "Travel Buddy Services",
    question: "What if my plans change after booking a travel companion?",
    answer:
      "You can cancel your booking and search for a new Travel Buddy based on your updated travel plans. We charge a flat cancellation fee of $10 USD and refund the remaining balance to your original payment method.",
  },
  {
    id: 10,
    category: "Buddy Courier Services",
    question: "How does the Buddy Courier service work?",
    answer:
      "To get started, enter your courier details and search for verified Buddy Couriers heading to your destination. You can send requests to multiple buddies at once. Once you find a match, the payment button will be activated in the selected buddy's profile. After completing the payment, you can coordinate directly through our in-app messaging system to finalize the details.",
  },
  {
    id: 11,
    category: "Buddy Courier Services",
    question: "What types of items can I send through Buddy Courier?",
    answer:
      "You are allowed to send documents and permissible items as per our platform's guidelines. Restricted or prohibited items are not allowed.",
  },
  {
    id: 12,
    category: "Buddy Courier Services",
    question: "How do I ensure my item is delivered safely?",
    answer:
      "We connect you with verified travelers, and you can stay in touch with them throughout the delivery process for real-time updates.",
  },
  {
    id: 13,
    category: "Buddy Courier Services",
    question: "Is there a weight or size limit for items?",
    answer:
      "Yes, weight and size restrictions may apply depending on the traveler or buddy courier's capacity. Ensure you communicate and agree on these details with the traveler before finalizing.",
  },
  {
    id: 14,
    category: "Buddy Courier Services",
    question: "What if my item is lost or damaged during delivery?",
    answer:
      "While we strive to connect you with trusted and verified travelers, Buddy On Board (the platform) does not take ownership or liability for items lost or damaged during delivery. Both parties are encouraged to communicate clearly, agree on terms, and assume responsibility for the item throughout the process. We recommend discussing precautions with the traveler to ensure safe handling and delivery.",
  },
  {
    id: 15,
    category: "Payments and Refunds",
    question: "How do I make a payment?",
    answer:
      "Payments can be securely made through the platform using our integrated payment gateway. We accept major credit cards and other popular payment methods.",
  },
  {
    id: 16,
    category: "Payments and Refunds",
    question: "Are payments refundable?",
    answer:
      "Refunds are applicable in specific situations, such as cancellations made within 48 hours before the journey or for courier shipments. Please refer to our refund policy for more details.",
  },
  {
    id: 17,
    category: "Payments and Refunds",
    question: "Are there additional charges for using the platform?",
    answer:
      "Creating an account and browsing profiles are free. However, services such as finding a Travel Buddy or a Buddy Courier involve a nominal fee. When requesting a buddy service, these details will be displayed transparently.",
  },
  {
    id: 18,
    category: "Support",
    question: "What if I have an issue with my booking or delivery?",
    answer:
      'Our support team is here to help. You can reach out to us through the "Contact Us" section for assistance with any issues or disputes.',
  },
  {
    id: 19,
    category: "Support",
    question: "Can I report a user if I feel unsafe?",
    answer:
      "Yes, you can report any user or suspicious activity directly within the platform. We take such reports seriously and will investigate promptly.",
  },
  {
    id: 20,
    category: "Support",
    question: "How do I get started?",
    answer:
      "Simply create an account, explore our services, request a Travel Buddy or Buddy Courier, complete your booking, coordinate with your buddy, and enjoy a stress-free, convenient travel or courier experience.",
  },
  {
    id: 21,
    category: "Buddies",
    question: "Who can become a Travel Buddy?",
    answer:
      "Anyone who is a verified user on the platform and is willing to assist fellow travelers can become a Travel Buddy. This opportunity allows users to earn money while traveling.",
  },
  {
    id: 22,
    category: "Buddies",
    question: "What are my responsibilities as a Travel Buddy?",
    answer:
      "As a Travel Buddy, your primary responsibility is to provide companionship and assistance to the traveler. This may include helping with communication, navigating airports and terminals, managing immigration and customs, or simply offering companion support during the journey.",
  },
  {
    id: 23,
    category: "Buddies",
    question: "Can I choose whom to travel with?",
    answer:
      "Yes, you have the option to review the requests from travelers and accept those that fit your preferences.",
  },
  {
    id: 24,
    category: "Buddies",
    question: "Do I get paid as a Travel Buddy?",
    answer:
      "Yes, Travel Buddies get compensated for their time and assistance. Payment will be processed securely through the platform after the successful completion of the trip.",
  },
  {
    id: 25,
    category: "Buddies",
    question: "What if my plans change after accepting a travel request?",
    answer:
      "You must notify the traveler as soon as possible through the platform's messaging system. Since it raises concerns for travelers seeking companions, the platform allows up to two cancellations for valid reasons.",
  },
  {
    id: 26,
    category: "Buddies",
    question: "Am I responsible for the traveler's safety or belongings?",
    answer:
      "No, you are not responsible for the traveler's safety or belongings. Your role is to assist and support, not to take liability for personal or security matters.",
  },
  {
    id: 27,
    category: "Buddies",
    question: "Who can become a Buddy Courier?",
    answer:
      "Any verified traveler who is willing to carry permissible items to their destination can become a Buddy Courier.",
  },
  {
    id: 28,
    category: "Buddies",
    question: "What kind of items am I allowed to carry?",
    answer:
      "You can carry documents and permissible items only. Restricted or prohibited items are not allowed and you have to accept 100% liability in the event of an issue with the Law Enforcement, Airlines, or Immigration authorities.",
  },
  {
    id: 29,
    category: "Buddies",
    question: "How much can I earn as a Buddy Courier?",
    answer:
      "Earnings depend on the size, weight, and type of item being delivered. The platform determines the price based on the service seeker's request. If there is a discrepancy, we recommend accepting or negotiating before finalizing the delivery.",
  },
  {
    id: 30,
    category: "Buddies",
    question: "What are my responsibilities as a Buddy Courier?",
    answer:
      "As a Buddy Courier, your primary responsibility is to carry the items and ensure their safe delivery. Communication with the sender and agreeing on terms is crucial for a smooth experience.",
  },
];
