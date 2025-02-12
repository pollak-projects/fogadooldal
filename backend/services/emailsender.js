import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use false for STARTTLS; true for SSL on port 465
  auth: {
    user: "betwisepollak@gmail.com",
    pass: "tihh vnvn gejx undr",
  },
});

// async..await is not allowed in global scope, must use a wrapper
export async function emailMegerosites(useremail, uuid) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    to: useremail, // list of receivers
    subject: "Email megerősítés", // Subject line
    text: "[Jelszo link]", // plain text body
    html:
    "<div style='font-family: Arial, sans-serif; background-color: #fafafa; margin: 0; padding: 0; width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 15px; box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);'>" + 
    "<div style='text-align: center; margin-bottom: 20px;'>" + 
    "<img src='https://i.ibb.co/1YjzxLQd/logo2.png' alt='BetWise Logo' style='max-width: 180px;'>" + 
    "</div>" + 
    "<div style='text-align: center; margin-bottom: 20px; color: #444;'>" + 
    "<h2 style='color: #2c3e50;'>E-mail cím megerősítése</h2>" + 
    "<p style='font-size: 16px;'>Üdvözlünk a BetWise-nál! Kérlek erősítsd meg az e-mail címed a fiók aktiválásához.</p>" + 
    "<br>"+
    "<p style='text-align: center;'><a href='http://localhost:5173/megerosites?token="+ uuid  +"' style='background-color: rgb(253, 32, 93); display: inline-block; padding: 18px 40px; background-color: rgb(253, 32, 93); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold;'>E-mail cím megerősítése</a></p>" +
     "<br>"+
    "<p style='font-size: 16px;'>Ha nem te regisztráltál, kérlek hagyd figyelmen kívül ezt az üzenetet.</p>" + 
    "</div>" + 
    "<div style='text-align: center; font-size: 14px; color: #888; margin-top: 30px;'>" + 
    "<p>Üdvözlettel, a BetWise csapata</p>" + 
    "</div>" + 
    "</div>"

  });

  console.log("Message sent: %s", info.messageId);
}






export async function jelszoVisszaallitas(useremail) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    to: useremail, // list of receivers
    subject: "Jelszó visszaállítás", // Subject line
    text: "[Jelszo link]", // plain text body
    html:
    "<div style='font-family: Arial, sans-serif; background-color: #fafafa; margin: 0; padding: 0; width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 15px; box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);'>" + 
    "<div style='text-align: center; margin-bottom: 20px;'>" + 
    "<img src='https://i.ibb.co/1YjzxLQd/logo2.png' alt='BetWise Logo' style='max-width: 180px;'>" + 
    "</div>" + 
    "<div style='text-align: center; margin-bottom: 20px; color: #444;'>" + 
    "<h2 style='color: #2c3e50;'>Jelszó visszaállítása</h2>" + 
    "<p style='font-size: 16px;'>Kérlek, kattints az alábbi gombra, hogy visszaállíthasd a jelszavad a BetWise fiókhoz.</p>" + 
    "<br>" + 
    "<p style='text-align: center;'><a href='[Jelszó visszaállító link]' style='background-color: rgb(253, 32, 93); display: inline-block; padding: 18px 40px; background-color: rgb(253, 32, 93); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold;'>Jelszó visszaállítása</a></p>" + 
    "<br>" + 
    "<p style='font-size: 16px;'>Ha nem kérted a jelszó visszaállítást, kérlek hagyd figyelmen kívül ezt az üzenetet.</p>" + 
    "</div>" + 
    "<div style='text-align: center; font-size: 14px; color: #888; margin-top: 30px;'>" + 
    "<p>Üdvözlettel, a BetWise csapata</p>" + 
    "</div>" + 
    "</div>"

  });

  console.log("Message sent: %s", info.messageId);
}