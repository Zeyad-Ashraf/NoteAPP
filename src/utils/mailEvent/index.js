import EventEmitter from "events";
import { sendMail } from "../../services/index.js";

export const eventEmitter = new EventEmitter();

eventEmitter.on("EmailExists", async ({email}) =>{
   await sendMail({
       email,
       subject: "Registration",
       html: "<p>Some one tried to register with Your email address. If this wasn't you, please tell us we may want you to reset your password.</p>",
   });
});

eventEmitter.on("confirmEmail", async ({email, otp}) =>{
   await sendMail({
       email,
       subject: "Confirm Your Email",
       html:`
            <div style="width: 91%; height:150px; background-color: #a52a2a; color: white; text-align: center; padding: 15px; border-radius: 10px; font-family: Arial, sans-serif;">
                <h2 style="margin: 0;">Your Confirm OTP</h2>
                <div style="background-color: white; color: black; padding: 15px; font-size: 20px; font-weight: bold; margin: 10px 0; border-radius: 5px;">
                    ${otp}
                </div>
            </div>
        `,
   });
});

eventEmitter.on("confirmed", async ({email}) =>{
   await sendMail({
       email,
       subject: "Confirm Your Email",
       html: `<p>Your email has been confirmed. Please login to continue.</p>`
   });
});

eventEmitter.on("forgetPassword", async ({email, otp}) =>{
   await sendMail({
       email,
       subject: "Reset Your Password",
       html: `
            <div style="width: 91%; height:150px; background-color: #a52a2a; color: white; text-align: center; padding: 15px; border-radius: 10px; font-family: Arial, sans-serif;">
                <h2 style="margin: 0;">Your Reset OTP</h2>
                <div style="background-color: white; color: black; padding: 15px; font-size: 20px; font-weight: bold; margin: 10px 0; border-radius: 5px;">
                    ${otp}
                </div>
            </div>
        `,
   });
});