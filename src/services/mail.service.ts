import Nodemailer from 'nodemailer';
import { config } from 'dotenv';

config();

const createTransport = async () => {
  return Nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD__TEST,
    },
  });
};

export class MailService {
  public static async sendMail(
    receiverEmail: string,
    message: string
  ): Promise<void> {
    const transporter = await createTransport();

    transporter.sendMail(
      {
        from: 'botifsulsapucaia@gmail.com',
        to: receiverEmail,
        subject: 'Validacão - Discord do Curso',
        text: message,
      },
      (err, info) => {
        console.log(err, info);
      }
    );
  }
}
