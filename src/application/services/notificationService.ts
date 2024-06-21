import nodemailer from 'nodemailer';

// Configuración del transporte de nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail', // o cualquier otro servicio de correo electrónico
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

const notifyTaskUpdate = async (email: string, taskTitle: string) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Task Update Notification',
    text: `The task "${taskTitle}" has been updated.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Notification sent to ${email} for task "${taskTitle}"`);
  } catch (error) {
    console.error(`Failed to send notification to ${email}:`, error);
  }
};

export { notifyTaskUpdate };