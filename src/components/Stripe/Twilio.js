const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN; 

const client = require('twilio')(accountSid, authToken);

client.messages.create({
  to: process.env.MY_PHONE_NUMBER,
  from: '12244354644',
  body: "ALL YOUR BASE ARE BELONG TO US"
}).then((message) => console.log(message.sid))
