import { Input, Form } from 'antd'
import { debounce } from 'lodash'
import './FilmSearchForm.css'
import { Component } from 'react'
class FilmSearchForm extends Component {
  state = {
    filmName: '',
  }

  editName = (e) => {
    this.setState({
      filmName: e.target.value,
    })
    this.props.startLoading()
  }

  searchMovies = debounce(this.props.getFilmsList, 700)

  componentDidMount() {
    if (this.state.filmName === '') this.props.getFilmsList('return')
  }

  render() {
    return (
      <Form>
        <Form.Item>
          <Input
            placeholder={'Type to search...'}
            className="film-search-form"
            onInput={(e) => {
              this.editName(e)
              this.searchMovies(this.state.filmName)
            }}
          />
        </Form.Item>
      </Form>
    )
  }
}
export default FilmSearchForm
