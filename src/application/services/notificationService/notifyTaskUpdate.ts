import { transporter } from "./transporter";

export const notifyTaskUpdate = async (email: string, taskTitle: string) => {
  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "Task Update Notification",
    text: `The task "${taskTitle}" has been updated.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Notification sent to ${email} for task "${taskTitle}"`);
  } catch (error) {
    console.error(`Failed to send notification to ${email}:`, error);
  }
};
