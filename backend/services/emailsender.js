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
export async function sikeresReg(useremail) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    to: useremail, // list of receivers
    subject: "Jelszó-visszaállítás", // Subject line
    text: "[Jelszo link]", // plain text body
    html:
  "<div style='font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);'>" + 
  "<div style='text-align: center; margin-bottom: 20px;'>" + 
    "<img src='https://i.ibb.co/wBX1pPt/majom.png' alt='BetWise Logo' style='max-width: 150px;'>" + 
  "</div>" + 
  "<div style='text-align: center; margin-bottom: 20px; color: #333;'>" + 
    "<h2 style='color: #000000;'>E-mail cím megerősítése</h2>" + 
    "<br>" + 
    "<p>Üdvözlünk a BetWise oldalán! A regisztrációdat sikeresen elvégezted, de az e-mail címed megerősítése még hátravan.</p>" + 
    "<p>Ha te voltál, kattints az alábbi gombra a regisztrációs folyamat befejezéséhez!</p>" + 
    "<p><a href='[Email megerősítő link]' style='background-color: #45a049; display: inline-block; padding: 15px 30px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;'>E-mail cím megerősítése</a></p>" + 
    "<p>Ha nem te regisztráltál, kérjük hagyd figyelmen kívül ezt az e-mailt.</p>" + 
  "</div>" + 
  "<div style='text-align: center; font-size: 12px; color: #777; margin-top: 20px;'>" + 
    "<p>Üdvözlettel,</p>" + 
    "<p>A BetWise csapata</p>" + 
  "</div>" + 
"</div>"

  });

  console.log("Message sent: %s", info.messageId);
}
