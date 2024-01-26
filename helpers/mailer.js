import nodemailer  from 'nodemailer';

 export const transport = nodemailer.createTransport({
   host: "smtp.gmail.com",
  secure: false, 
  auth: {
    user:  process.env .EMAIL ,  
    pass:  process.env.EMAIL_PASSWORD 
  }
});
 
  