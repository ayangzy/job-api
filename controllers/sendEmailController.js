const nodemailer = require('nodemailer');
const { StatusCodes } = require('http-status-codes');
const sgMail = require('@sendgrid/mail');

exports.sendEmail = async (req, res) => {

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  //define the email options
  const mailOptions = {
    from: 'John Doe <johndoe@gmail.com>', // Change to your verified sender
    to: 'foo@example.com',  // Change to your recipient
    subject: 'Backend developer(Nodejs)',
    text: "Hi, my name is felix, I'm a proficient backend developer with expectise in nodejs....",
  };

  //actually send the email
  await transporter.sendMail(mailOptions);
  
  res.status(StatusCodes.OK).send({status: 'success', message: 'Email sent successfully'});
};

//implement email sending using send grid
const sendEmailGrid = async(req, res) => {

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: 'foo@example.com', // Change to your recipient
      from: 'johndoe@gmail.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    const info = await sgMail.send(msg);
    res.json(info);
}


