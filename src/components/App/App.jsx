import React, { Component, useState } from 'react'
import { MovieApi } from '../../utilities/MovieApiClient'
import { Offline, Online } from 'react-detect-offline'
import { Alert } from 'antd'
import SearchOption from '../SearchOption/SearchOption'
import FilmSearchForm from '../FilmSearchForm/FilmSearchForm'
import FilmsList from '../FilmsList/FilmList'
import PagesPagination from '../Pagination/Pagination'
import './App.css'
import { isError } from 'lodash'

export const GenresContext = React.createContext()
const api = new MovieApi()

export default class App extends Component {
  state = {
    filmData: [],
    isLoading: false,
    error: false,
    totalResults: null,
    totalPages: null,
    currentQuery: null,
    sessionId: null,
    genres: null,
    isRatedPage: false,
    ratedList: [],
    totalRatedPages: null,
  }

  getFilmsList = (filmName, pageNumber = 1) => {
    api
      .getFilmsList(filmName, pageNumber)
      .then((data) => {
        this.setState({
          filmData: data.results,
          totalResults: data.total_results,
          isLoading: false,
          totalPages: data.total_pages,
          currentQuery: filmName,
          ratedList: [],
          totalRatedPages: null,
        })
      })
      .catch((er) => this.setState({ error: true }))
  }

  startLoading = () => {
    this.setState({ isLoading: true })
  }

  startSession = async () => {
    api.startSession().then((data) => {
      this.setState({ sessionId: data.guest_session_id })
    })
  }

  getGenres = async () => {
    api.getGenres().then((data) => {
      this.setState({ genres: data.genres })
    })
  }

  getRatedList = async (pageNumber) => {
    api.getRatedList(this.state.sessionId, pageNumber).then((data) => {
      console.log(data.total_pages)
      this.setState({ isRatedPage: true, ratedList: data?.results || [], totalRatedPages: data.total_pages })
    })
  }

  toSearchPage = () => {
    this.setState({ isRatedPage: false })
  }

  addRating = async (movieId, value) => {
    api.addRating(movieId, value, this.state.sessionId)
  }

  componentDidMount() {
    this.startSession()
    this.getGenres()
  }
  noConnectAlert = () => <Alert message="Error" description="Проверьте соединение" type="error" showIcon={true} />

  render() {
    if (this.state.isRatedPage)
      return (
        <div className="body">
          <header className="header">
            <SearchOption toSearchPage={this.toSearchPage} isRatedPage={this.state.isRatedPage} />
          </header>
          <main>
            <GenresContext.Provider value={{ genres: this.state.genres, addRating: this.addRating }}>
              <FilmsList filmData={this.state.ratedList} isError={this.state.error} />
            </GenresContext.Provider>
          </main>
          <footer>
            <PagesPagination filmsData={this.state} getRatedList={this.getRatedList} />
          </footer>
        </div>
      )
    return (
      <div className="body">
        <header className="header">
          <SearchOption getRatedList={this.getRatedList} isRatedPage={this.state.isRatedPage} />
          <FilmSearchForm getFilmsList={this.getFilmsList} startLoading={this.startLoading} />
        </header>
        <main>
          <GenresContext.Provider value={{ genres: this.state.genres, addRating: this.addRating }}>
            <FilmsList
              filmData={this.state.filmData}
              isLoading={this.state.isLoading}
              isError={this.state.error}
              totalResults={this.state.totalResults}
              totalPages={this.state.totalPages}
              isRatedPage={this.state.isRatedPage}
            />
          </GenresContext.Provider>
        </main>
        <footer>
          <PagesPagination filmsData={this.state} getFilmsList={this.getFilmsList} />
        </footer>
      </div>
    )
  }
}
