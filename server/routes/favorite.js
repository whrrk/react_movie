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


router.post('/favorited', (req, res) => {

    //내가 이 영화를 좋아하는 리스트에 추가 했는지 안했는지 DB에서 가져오기
    //mongoDB에서 favorite 숫자를 가져오게함
    Favorite.find({ "movieInd": req.body.movieId, "userFrom": req.body.userFrom })
        .exec((err, info) => {
            if (err) return res.status(400).send(err)

            let result = false;
            if (info.length !== 0) {
                result = true
            }

            res.status(200).json({ success: true, favorited: result })
        })
    //그 다음 프론트에 다시 숫자 정보를 보내줌

})

router.post('/addToFavorite', (req, res) => {

    const favorite = new Favorite(req.body)

    favorite.save((err, doc) => {
        if (err) return res.status(400).send(err)
        return res.status(200).json({ success: true })
    })

})

router.post('/removeFromFavorite', (req, res) => {

    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, result) => {
            if (err) return res.status(400).send(err)
            return res.status(200).json({ success: true, result })
        })
})

router.post('/getFavoredMovie', (req, res) => {

    Favorite.find({ 'userFrom': req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).send(err)
            return res.status(200).json({ success: true, Favorites: doc })
        })
})


module.exports = router;
