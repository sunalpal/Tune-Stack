import express from 'express';

import sendEmail from './utils/email.js';
const app=express();


sendEmail('sunal8093525770sunal@gmail.com',"test email","this is a test email from Tune Stack ","<h1>This is a test email yar </h1>")
export default app;