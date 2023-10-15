import { HttpException, HttpStatus } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

const sendMail = async (addres: string, content: string) => {
  try {
    const transport = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: true,
      auth: {
        user: 'lincorteamnt@gmail.com',
        pass: 'xbewqqnfarwklaaj',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transport.sendMail({
      from: 'lincorteamnt@gmail.com',
      to: addres,
      subject: 'Link for Web Site',
      text: content,
    });
  } catch (error) {
    throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  }
};

export default sendMail;
