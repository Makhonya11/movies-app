import { Spin } from 'antd'
import { Alert } from 'antd'
import { Component } from 'react'
import FilmCard from '../FilmCard/FilmCard'
import './FilmsList.css'

class FilmsList extends Component {
  render() {
    if (this.props.isRatedPage && (!this.props.filmData || this.props.filmData.length === 0))
      return <Alert message="Тут пока пусто. Поставь рейтинг фильму" type="info" showIcon={true} banner={true} />
    else if (this.props.isRatedPage && this.props.filmData.length > 0)
      return (
        <ul className="filmslist">
          {this.props.filmData.map((film) => (
            <FilmCard key={film.id} filmData={film} />
          ))}
        </ul>
      )

    if (this.props.isLoading) {
      return <Spin size="large" />
    } else if (this.props.isError) {
      return <Alert message="Error" description="Произошла ошибка" type="error" showIcon={true} banner={true} />
    } else if (this.props.totalResults === 0) {
      return <Alert description="Мы не знаем такого фильма(" type="info" showIcon={true} />
    } else {
      return (
        <ul className="filmslist">
          {this.props.filmData.map((film) => (
            <FilmCard key={film.id} filmData={film} />
          ))}
        </ul>
      )
    }
  }
}
export default FilmsList
