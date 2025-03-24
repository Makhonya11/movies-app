export class MovieApi {
  _APIBASE = 'https://api.themoviedb.org/3'
  _AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN

  getFilmsList = async (filmName, pageNumber = 1) => {
    const res = await fetch(`${this._APIBASE}/search/movie?query=${filmName}&page=${pageNumber}`, {
      headers: {
        Authorization: `Bearer ${this._AUTH_TOKEN}`,
        accept: 'application/json',
      },
    })
    if (res.ok) return await res.json()
  }

  startSession = async () => {
    const res = await fetch(`${this._APIBASE}/authentication/guest_session/new`, {
      headers: {
        Authorization: `Bearer ${this._AUTH_TOKEN}`,
        accept: 'application/json',
      },
    })
    if (res.ok) return await res.json()
  }

  getGenres = async () => {
    const res = await fetch(`${this._APIBASE}/genre/movie/list?language=en`, {
      headers: {
        Authorization: `Bearer ${this._AUTH_TOKEN}`,
        accept: 'application/json',
      },
    })
    if (res.ok) return await res.json()
  }

  getRatedList = async (sessionId, pageNumber = 1) => {
    const res = await fetch(
      `${this._APIBASE}/guest_session/${sessionId}/rated/movies?language=en-US&page=${pageNumber}`,
      {
        headers: {
          Authorization: `Bearer ${this._AUTH_TOKEN}`,
          accept: 'application/json',
        },
      }
    )
    if (res.ok) return await res.json()
    return false
  }

  addRating = async (movieId, value, sessionId) => {
    const res = await fetch(`${this._APIBASE}/movie/${movieId}/rating?guest_session_id=${sessionId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this._AUTH_TOKEN}`,
        'Content-Type': 'application/json;charset=utf-8',
        accept: 'application/json',
      },
      body: JSON.stringify({ value }),
    })
  }
}
