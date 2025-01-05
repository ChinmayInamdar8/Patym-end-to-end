const express = require('express');

const router = express.Router();


router.get('/', (req, res)=>{
    res.send("this is / api point");
})

router.get("/user", (req, res)=>{
    res.send("this is /user api point");
})

module.exports = router;