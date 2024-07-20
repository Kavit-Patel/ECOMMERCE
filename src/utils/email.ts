// import nodemailer from "nodemailer";

// export const sendVerificationEmail = async (
//   email: string,
//   verificationLink: string,
// ) => {
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: Number(process.env.SMTP_PORT),
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });

//   const mailOptions = {
//     from: `"Your Company" <${process.env.SMTP_USER}>`, // sender address
//     to: email, // list of receivers
//     subject: "Email Verification", // Subject line
//     text: `Please verify your email by clicking the following link: ${verificationLink}`, // plain text body
//     html: `<p>Please verify your email by clicking the following link: <a href="${verificationLink}">Verify Email</a></p>`, // html body
//   };

//   await transporter.sendMail(mailOptions);
// };
// src/services/emailService.ts

// import SibApiV3Sdk from "sib-api-v3-sdk";

// // Set up the default client
// const defaultClient = SibApiV3Sdk.ApiClient.instance;

// // Type for the authentication object
// type AuthenticationObject = {
//   apiKey: string;
// };

// // Set up the API key
// const apiKey = defaultClient.authentications["api-key"] as AuthenticationObject;
// apiKey.apiKey = process.env.SENDINBLUE_API_KEY!;

// // Initialize the transactional email API instance
// const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// export const sendVerificationEmail = async (
//   to: string,
//   verificationCode: number,
// ) => {
//   const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail({
//     to: [{ email: to }],
//     sender: { email: "your-email@example.com", name: "KAVIT PATEL" },
//     subject: "Email Verification",
//     textContent: `Your verification code is: ${verificationCode}`,
//     htmlContent: `<strong>Your verification code is: ${verificationCode}</strong>`,
//   });

//   try {
//     await apiInstance.sendTransacEmail(sendSmtpEmail);
//     console.log("Verification email sent");
//   } catch (error) {
//     console.error("Error sending verification email", error);
//   }
// };

// src/services/emailService.ts
// import SibApiV3Sdk from "sib-api-v3-sdk";

// // Define types for the SendSmtpEmail payload
// interface SendSmtpEmailPayload {
//   to: { email: string }[];
//   sender: { email: string; name: string };
//   subject: string;
//   textContent: string;
//   htmlContent: string;
// }

// // Set up the default client
// const defaultClient = SibApiV3Sdk.ApiClient.instance;

// // Type for the authentication object
// interface ApiKeyAuthentication {
//   apiKey: string;
// }

// // Set up the API key
// const apiKey = defaultClient.authentications["api-key"] as ApiKeyAuthentication;
// apiKey.apiKey = process.env.SENDINBLUE_API_KEY ?? "";

// // Initialize the transactional email API instance
// const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// export const sendVerificationEmail = async (
//   to: string,
//   verificationCode: number,
// ): Promise<void> => {
//   const sendSmtpEmail: SendSmtpEmailPayload = {
//     to: [{ email: to }],
//     sender: { email: "your-email@example.com", name: "Your Name" },
//     subject: "Email Verification",
//     textContent: `Your verification code is: ${verificationCode}`,
//     htmlContent: `<strong>Your verification code is: ${verificationCode}</strong>`,
//   };

//   try {
//     await apiInstance.sendTransacEmail(sendSmtpEmail);
//     console.log("Verification email sent");
//   } catch (error) {
//     // Use a specific type for the error if possible
//     console.error("Error sending verification email", error as Error);
//   }
// };

// src/server/utils/emailService.ts

// import SibApiV3Sdk from "sib-api-v3-sdk";

// interface SendSmtpEmailPayload {
//   to: { email: string }[];
//   sender: { email: string; name: string };
//   subject: string;
//   textContent: string;
//   htmlContent: string;
// }

// const defaultClient = SibApiV3Sdk.ApiClient.instance;

// interface ApiKeyAuthentication {
//   apiKey: string;
// }

// const apiKey = defaultClient.authentications["api-key"] as ApiKeyAuthentication;
// apiKey.apiKey = process.env.SENDINBLUE_API_KEY ?? "";

// const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// export const sendVerificationEmail = async (
//   to: string,
//   verificationCode: number,
// ): Promise<void> => {
//   const sendSmtpEmail: SendSmtpEmailPayload = {
//     to: [{ email: to }],
//     sender: { email: "your-email@example.com", name: "Your Name" },
//     subject: "Email Verification",
//     textContent: `Your verification code is: ${verificationCode}`,
//     htmlContent: `<strong>Your verification code is: ${verificationCode}</strong>`,
//   };

//   try {
//     await apiInstance.sendTransacEmail(sendSmtpEmail);
//     console.log("Verification email sent");
//   } catch (error) {
//     console.error("Error sending verification email", error);
//   }
// };

// src/server/utils/emailService.ts
// import fetch from 'node-fetch';

// interface SendEmailPayload {
//   to: { email: string }[];
//   sender: { email: string; name: string };
//   subject: string;
//   textContent: string;
//   htmlContent: string;
// }

// export const sendVerificationEmail = async (
//   to: string,
//   verificationCode: number,
// ): Promise<void> => {
//   const payload: SendEmailPayload = {
//     to: [{ email: to }],
//     sender: { email: "your-email@example.com", name: "Your Name" },
//     subject: "Email Verification",
//     textContent: `Your verification code is: ${verificationCode}`,
//     htmlContent: `<strong>Your verification code is: ${verificationCode}</strong>`,
//   };

//   try {
//     const apiKey = process.env.SENDINBLUE_API_KEY ?? "";
//     if (!apiKey) {
//       throw new Error("SENDINBLUE_API_KEY is not set");
//     }

//     const response = await fetch("https://api.brevo.com/v3/smtp/email", {
//       method: "POST",
//       headers: {
//         "api-key": apiKey,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) {
//       const errorResponse = await response.json();
//       console.error("Error response from Brevo API:", errorResponse);
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     console.log("Verification email sent");
//   } catch (error) {
//     console.error("Error sending verification email", error);
//   }
// };

// interface SendEmailPayload {
//   to: { email: string }[];
//   sender: { email: string; name: string };
//   subject: string;
//   textContent: string;
//   htmlContent: string;
// }

// export const sendVerificationEmail = async (
//   to: string,
//   verificationCode: number,
// ): Promise<void> => {
//   const payload: SendEmailPayload = {
//     to: [{ email: to }],
//     sender: { email: "your-email@example.com", name: "Your Name" },
//     subject: "Email Verification",
//     textContent: `Your verification code is: ${verificationCode}`,
//     htmlContent: `<strong>Your verification code is: ${verificationCode}</strong>`,
//   };

//   try {
//     const response = await fetch("https://api.brevo.com/v3/smtp/email", {
//       method: "POST",
//       headers: {
//         "api-key": process.env.SENDINBLUE_API_KEY ?? "",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     console.log("Verification email sent");
//   } catch (error) {
//     console.error("Error sending verification email", error);
//   }
// };

// import emailjs from "@emailjs/browser";

// export const sendVerificationEmail = async (
//   to: string,
//   verificationCode: number,
// ): Promise<void> => {
//   const serviceID = process.env.EMAILJS_SERVICE_ID!;
//   const templateID = process.env.EMAILJS_TEMPLATE_ID!;
//   const publicKey = process.env.EMAILJS_PUBLIC_KEY!;

//   const templateParams = {
//     from_name: "kavit",
//     from_email: "kvpatel.er@gmail.com",
//     to_name: "Guest",
//     message: `Your Varification code is : ${verificationCode}`,
//     to_email: to,
//     reply_to: "kvpatel.er@gmail.com",
//   };

//   try {
//     await emailjs.send(serviceID, templateID, templateParams, publicKey);
//     console.log("Verification email sent");
//   } catch (error) {
//     console.error("Error sending verification email", error);
//   }
// };
// import { SMTPClient } from "emailjs";

// const client = new SMTPClient({
//   user: 'Kavit',
//   password: process.env.EMAILJS_PRIVATE_KEY, // If required
//   host: "smtp.your-email-provider.com", // Use the appropriate SMTP host
//   ssl: true,
// });

// const sendEmailAsync = (message: any): Promise<void> => {
//   return new Promise((resolve, reject) => {
//     client.send(message, (err: Error | null, message: string) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve();
//       }
//     });
//   });
// };

// export const sendVerificationEmail = async (
//   to: string,
//   verificationCode: number,
// ): Promise<void> => {
//   const message = {
//     text: `Your verification code is: ${verificationCode}`,
//     from: "Your Name <your-email@example.com>",
//     to: to,
//     subject: "Email Verification",
//   };

//   try {
//     await sendEmailAsync(message);
//     console.log("Verification email sent");
//   } catch (error) {
//     console.error("Error sending verification email", error);
//   }
// };

// import emailjs from "@emailjs/browser";
// export const sendVerificationEmail = async (to: string, code: string) => {
//   await emailjs.send("service_j64ceun", "template_pjzq5xs", {
//     from_name: "kavit",
//     to_name: "firstfree",
//     message: `hi testing ${code}`,
//     to_email: "1firstfree1@gmail.com",
//     reply_to: "kvpatel.er@gmail.com",
//   });
// };

// src/utils/emailService.ts
// import fetch from 'node-fetch';

// src/utils/emailService.ts

// export const sendVerificationEmail = async (
//   to: string,
//   verificationCode: string,
// ): Promise<void> => {
//   const data = {
//     service_id: process.env.EMAILJS_SERVICE_ID!,
//     template_id: process.env.EMAILJS_TEMPLATE_ID!,
//     user_id: process.env.EMAILJS_PUBLIC_KEY!,
//     template_params: {
//       to_email: to,
//       verification_code: verificationCode,
//     },
//   };

//   try {
//     const response = await fetch(
//       "https://api.emailjs.com/api/v1.0/email/send",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Basic ${Buffer.from(`${process.env.EMAILJS_PUBLIC_KEY}:${process.env.EMAILJS_PRIVATE_KEY}`).toString("base64")}`,
//         },
//         body: JSON.stringify(data),
//       },
//     );

//     // Log the response status and text
//     const responseText = await response.text();
//     console.log("Response Status:", response.status);
//     console.log("Response Text:", responseText);

//     if (!response.ok) {
//       throw new Error(`Error sending email: ${responseText}`);
//     }

//     console.log("Verification email sent successfully");
//   } catch (error) {
//     console.error("Error sending verification email:", error);
//   }
// };
// import emailjs from "@emailjs/browser";

// export const sendVerificationEmail = async (
//   to: string,
//   verificationCode: number,
// ): Promise<void> => {
//   const serviceID = process.env.EMAILJS_SERVICE_ID!;
//   const templateID = process.env.EMAILJS_TEMPLATE_ID!;
//   const publicKey = process.env.EMAILJS_PUBLIC_KEY!;

//   const templateParams = {
//     from_name: "kavit",
//     from_email: "kvpatel.er@gmail.com",
//     to_name: "Guest",
//     message: `Your Varification code is : ${verificationCode}`,
//     to_email: to,
//     reply_to: "kvpatel.er@gmail.com",
//   };

//   try {
//     await emailjs.send(
//       "service_j64ceun",
//       "template_pjzq5xs",
//       templateParams,
//       "9Dx76O32ZCBd4SHAa",
//     );
//     console.log("Verification email sent");
//   } catch (error) {
//     console.error("Error sending verification email", error);
//   }
// };

import emailjs from "@emailjs/browser";

export const sendVerificationEmail = async (
  to: string,
  verificationCode: string,
): Promise<void> => {
  const serviceID = process.env.EMAILJS_SERVICE_ID!;
  const templateID = process.env.EMAILJS_TEMPLATE_ID!;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY!;

  const templateParams = {
    from_name: "kavit",
    from_email: "kvpatel.er@gmail.com",
    to_name: "Guest",
    message: `Your Varification code is : ${verificationCode}`,
    to_email: to,
    reply_to: "kvpatel.er@gmail.com",
  };

  try {
    await emailjs.send(
      "service_j64ceun",
      "template_pjzq5xs",
      templateParams,
      "9Dx76O32ZCBd4SHAa",
    );
    console.log("Verification email sent");
  } catch (error) {
    console.error("Error sending verification email", error);
  }
};
