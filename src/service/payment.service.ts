const Razorpay = require('razorpay'); 

export const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_ID || 'rzp_test_Hu4ySMf4glANDv',
    key_secret: process.env.RAZORPAY_SECRET || '9OFBcTgX5SvV4ZgO8xwnLphM'
});

