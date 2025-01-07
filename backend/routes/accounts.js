const express = require('express');
const { AuthMiddleware } = require('../middleware');
const { User, Account } = require('../db');
const { default: mongoose } = require('mongoose');
const router = express.Router();


router.get('/balance', AuthMiddleware, async(req, res)=>{
    const account = await Account.findOne({userId: req.userId});

    res.json({
        balance:account.balance
    });
});

router.post('/transfer', AuthMiddleware, async(req, res)=>{

    const{amount, to} = req.body;

    // check for senders account
    const account = await Account.findOne({userId:req.userId});

    if(!account || account.balance<amount || amount<=0){
        return res.status(400).json({
            message:"balance is insufficient"
        })
    }
    const toAccount = await Account.findOne({userId:to});

    if(!account){
        return res.status(400).json({
            message:"receivers account is not present"
        })
    }

    await Account.updateOne({userId:req.userId}, {$inc:{balance:-amount}});
    await Account.updateOne({userId:to}, {$inc:{balance:amount}});

    res.json({
        message:"Fund transfered successfully!"
    })

})

module.exports = router;