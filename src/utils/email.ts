import emailjs from "@emailjs/browser";

export const sendVerificationEmail = async (
  to: string,
  verificationCode: string,
): Promise<void> => {
  const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
  const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

  const templateParams = {
    from_name: "kavit",
    from_email: "kvpatel.er@gmail.com",
    to_name: "Guest",
    message: `Your Varification code is : ${verificationCode}`,
    to_email: to,
    reply_to: "kvpatel.er@gmail.com",
  };

  try {
    await emailjs.send(serviceID, templateID, templateParams, publicKey);
  } catch (error) {
    console.error("Error sending verification email", error);
  }
};
