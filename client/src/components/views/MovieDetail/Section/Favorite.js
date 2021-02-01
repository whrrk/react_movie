import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Button } from 'antd'

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)


    let variables = {
        userFrom: userFrom,
        movieId: movieId,
        moviePost: moviePost,
        movieTitle: movieTitle,
        movieRunTime: movieRunTime
    }

    useEffect(() => {
        //이 영화를 얼마나 많은 사람이 favorite 했는지 정보를 얻을 수 있는 로직

        //fetch()를 쓸수도있고 Axios로 할 수도 있음.
        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                //response에 결과값이 들어옴
                setFavoriteNumber(response.data.favoriteNumber)

                if (response.data.success) {
                    //favoriteNumber: 0 success: true 이런식으로 나옴

                } else {
                    alert('숫자 정보를 가져오는데 실패 함.')
                }
            })

        Axios.post('/api/favorite/favorited', variables)
            .then(response => {
                //response에 결과값이 들어옴

                if (response.data.success) {
                    setFavorited(response.data.favorited)
                } else {
                    alert('정보를 가져오는데 실패 함.')
                }
            })

    }, [])


    const onClickFavorite = () => {
        if (userFrom !== null) {
            if (Favorited) {
                Axios.post('/api/favorite/removeFromFavorite', variables)
                    .then(response => {
                        if (response.data.success) {
                            setFavoriteNumber(FavoriteNumber - 1)
                            setFavorited(!Favorited)
                        } else {
                            alert('Favorite list remove failed')
                        }
                    })
            }
            else {
                Axios.post('/api/favorite/addToFavorite', variables)
                    .then(response => {
                        if (response.data.success) {
                            setFavoriteNumber(FavoriteNumber + 1)
                            setFavorited(!Favorited)
                        } else {
                            alert('Favorite list add failed')
                        }
                    })
            }
        }
    }

    return (
        <div>
            <Button onClick={onClickFavorite}>{Favorited ? " Not Favorite" : "Add to Favorited"} {FavoriteNumber} </Button>
        </div>
    )
}

export default Favorite
