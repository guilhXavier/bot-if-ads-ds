import Nodemailer from 'nodemailer';

const createTestTransport = async () => {
  let testAccount = await Nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = Nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  return transporter;
};

export class MailService {
  public async sendMail(receiverEmail: string): Promise<void> {
    const transporter = await createTestTransport();

    transporter.sendMail(
      {
        from: 'guilhermetamara5@icloud.com',
        to: 'guilhermetamara5@icloud.com',
        subject: 'Test Email',
        text: 'Example email',
      },
      (err, info) => {
        console.log(err, info);
      }
    );
  }
}
