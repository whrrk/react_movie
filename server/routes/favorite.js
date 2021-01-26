const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

router.post('/favoriteNumber', (req, res) => {


    //mongoDB에서 favorite 숫자를 가져오게함
    Favorite.find({ "movieInd": req.body.movieId })
        .exec((err, info) => {
            if (err) return res.status(400).send(err)

            res.status(200).json({ success: true, favoriteNumber: info.length })
        })
    //그 다음 프론트에 다시 숫자 정보를 보내줌

})


module.exports = router;
