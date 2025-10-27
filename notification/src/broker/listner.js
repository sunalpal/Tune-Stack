import { subscribeToQueue } from "./rabbit.js";
import sendEmail from "../utils/email.js";
function startListener() {


    subscribeToQueue("user_created",async(msg)=>{

        const {email,role,fullname:{firstName,lastName}}=msg;

        const template=`<h1>Welcome to Tune Stack</h1>
        <p>Dear ${firstName} ${lastName},</p>
        <p>Thank you for registering as a ${role} on our platform. We're excited to have you on board!</p>
        <p>Best regards,<br/>The Tune Stack Team</p>
        `
        await sendEmail(email,"Welcome to Tune Stack","Thank you for registering with Tune Stack",template);
    })
}


export default startListener;