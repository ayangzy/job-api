const { StatusCodes } = require('http-status-codes');
const  CustomError  = require('../errors');
const paystack = require('paystack')(process.env.PAYSTACK_SECRET);

exports.pay = async(req, res) => {
    console.log(req.body);
    const { total_amount, shipping_fee } = req.body;

    const calculateTotal = () => {
        return total_amount + shipping_fee
    };

    const payment = await paystack.transaction.initialize({
        'amount': calculateTotal() * 100,
        'email': req.body.email,
        'currency': 'NGN'
    });

    res.status(StatusCodes.OK).send(payment);
    
};
