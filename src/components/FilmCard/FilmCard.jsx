import { Card, Rate, Tag } from 'antd'
import { format } from 'date-fns'
import { Component } from 'react'
import { useContext } from 'react'
import { GenresContext } from '../App/App'
import './FilmCard.css'

const FilmCard = ({ filmData: { title, release_date, vote_average, overview, poster_path, genre_ids, id } }) => {
  const trimOverview = (overview, symbolCount = 208) => {
    if (overview.length > symbolCount) {
      const lastSymbolIndex = overview.indexOf(' ', symbolCount)
      const newOverview = overview.slice(0, lastSymbolIndex) + '...'
      return newOverview
    } else return overview
  }

  const updateReleaseDate = (date) => {
    if (date.length < 1) {
      return date
    } else return format(date, 'MMMM d, yyyy')
  }

  const rateRound = (rate) => {
    if ((rate + '').length > 2) return rate.toFixed(1)
    return rate
  }

  const rateColorStyle = () => {
    if (vote_average < 3) return '#E90000'
    else if (vote_average >= 3 && vote_average < 5) return '#E97E00'
    else if (vote_average >= 5 && vote_average < 7) return '#E9D100'
    else if (vote_average >= 7) return '#66E900'
  }

  const { genres, addRating } = useContext(GenresContext)

  const movieGenre = (genre_ids, genres) => {
    return genre_ids.map((gen) => {
      const matchedGenre = genres.find((genre) => genre.id === gen)
      if (matchedGenre) return <Tag key={matchedGenre.id}>{matchedGenre.name}</Tag>
      return null
    })
  }

  return (
    <Card className="filmcard" style={{ padding: 0, margin: 0 }}>
      <div className="filmcard-wrapper">
        <div className="image">
          <img
            src={
              poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : 'https://cleanshop.ru/i/no_image.gif'
            }
            alt="movie image"
          />
        </div>
        <div className="filmname">
          <h5 className="title">{title}</h5>
          <span className="release-date">{updateReleaseDate(release_date)} </span>
          {movieGenre(genre_ids, genres)}
        </div>

        <span className="rating" style={{ borderColor: rateColorStyle() }}>
          {rateRound(vote_average)}
        </span>
        <div className="description">
          <p>{trimOverview(overview)}</p>
          <Rate count={10} allowHalf={true} onChange={(value) => addRating(id, value)}></Rate>
        </div>
      </div>
    </Card>
  )
}
export default FilmCard
