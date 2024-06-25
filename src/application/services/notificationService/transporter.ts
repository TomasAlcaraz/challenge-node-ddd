import nodemailer from 'nodemailer';

// Configuración del transporte de nodemailer
export const transporter = nodemailer.createTransport({
  service: 'Gmail', // o cualquier otro servicio de correo electrónico
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});