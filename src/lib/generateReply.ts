export type BusinessType = "restaurant" | "clinic" | "salon" | "retail";
export type Tone = "happy" | "apologetic";

interface GenerateParams {
  review: string;
  businessType: BusinessType;
  tone: Tone;
  rating: number;
}

const businessNames: Record<BusinessType, string> = {
  restaurant: "the restaurant",
  clinic: "our clinic",
  salon: "the salon",
  retail: "our store",
};

const businessSignOff: Record<BusinessType, string> = {
  restaurant: "We hope to welcome you back for another great meal soon!",
  clinic: "We look forward to caring for you again at your next visit.",
  salon: "We can't wait to pamper you again on your next visit!",
  retail: "We hope to see you again soon for another great shopping experience!",
};

const happyTemplates: Record<BusinessType, string[]> = {
  restaurant: [
    "Thank you so much for the wonderful review! We're thrilled you enjoyed your meal and had a great experience with us.",
    "What a lovely review — thank you! It truly makes our day to know you loved the food and the service.",
    "Thank you for dining with us and for the kind words! We're so glad everything hit the mark.",
  ],
  clinic: [
    "Thank you for taking the time to share your experience. We're so glad you felt well cared for during your visit.",
    "We truly appreciate your kind words! Providing compassionate, quality care is what we strive for every day.",
    "Thank you for trusting us with your care. Your feedback motivates our entire team to keep doing our best.",
  ],
  salon: [
    "Thank you for the amazing review! We're so happy you loved your results and felt pampered during your visit.",
    "We're thrilled you had such a great experience! It was a pleasure having you, and we love hearing you felt refreshed and confident.",
    "Thank you for the kind review! Making you look and feel your best is always our goal.",
  ],
  retail: [
    "Thank you for the fantastic review! We're so glad you found what you were looking for and had a great shopping experience.",
    "We appreciate your kind words! Delivering quality products and friendly service is always our goal.",
    "Thank you for shopping with us! We're delighted everything went smoothly and you left happy.",
  ],
};

const apologeticTemplates: Record<BusinessType, string[]> = {
  restaurant: [
    "Thank you for sharing your feedback, and we sincerely apologize that your experience didn't meet your expectations. We take your comments seriously and would love the opportunity to make it right.",
    "We're truly sorry to hear that your visit wasn't up to our usual standards. Your feedback helps us improve, and we'd appreciate the chance to turn this around for you.",
    "Thank you for your honest feedback. We're genuinely sorry your meal didn't meet expectations — that's not the experience we want anyone to have.",
  ],
  clinic: [
    "Thank you for your feedback, and we're sorry your experience fell short of the care we aim to provide. We take your concerns seriously and would like to learn more so we can address them.",
    "We sincerely apologize that your visit didn't meet your expectations. Patient experience is our top priority, and we'd welcome the opportunity to discuss this further.",
    "We're sorry to hear your visit was disappointing. We hold ourselves to a high standard of care and your feedback helps us identify where we fell short.",
  ],
  salon: [
    "We're so sorry your experience didn't reflect the level of service we strive to deliver. Your satisfaction matters deeply to us, and we'd love the chance to make it right.",
    "Thank you for sharing your thoughts, and we apologize for falling short. We take all feedback seriously and would appreciate the opportunity to address your concerns personally.",
    "We're genuinely sorry your visit didn't meet your expectations. Every guest deserves to feel pampered and valued, and we'd like to make this right.",
  ],
  retail: [
    "We're sorry to hear your experience didn't meet your expectations. We value your feedback and want to make things right — please reach out so we can learn more.",
    "Thank you for taking the time to share this. We apologize for the inconvenience and are committed to improving based on your comments.",
    "We're sorry your visit fell short. We take pride in our service and your feedback helps us do better next time.",
  ],
};

const apologeticActions = [
  "Please feel free to reach out to us directly so we can learn more and make it right.",
  "We'd love to hear more about your visit — contact us anytime and we'll do everything we can to resolve this.",
  "If you're open to it, we'd appreciate the chance to speak with you directly and make things right.",
  "We'd welcome the opportunity to make this right — please don't hesitate to reach out to us directly.",
];

export function generateReply({ review, businessType, tone, rating }: GenerateParams): string {
  const reviewSnippet = review.trim().length > 0 ? ` It was wonderful to read your thoughts` : "";

  if (tone === "happy" || rating >= 4) {
    const opener = happyTemplates[businessType][
      Math.floor(Math.random() * happyTemplates[businessType].length)
    ];
    return `${opener}${reviewSnippet}.\n\n${businessSignOff[businessType]}\n\n— The team at ${capitalize(businessNames[businessType])}`;
  }

  const opener = apologeticTemplates[businessType][
    Math.floor(Math.random() * apologeticTemplates[businessType].length)
  ];
  const action = apologeticActions[Math.floor(Math.random() * apologeticActions.length)];

  return `${opener}\n\n${action}\n\n— The team at ${capitalize(businessNames[businessType])}`;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
