import { Component } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ViewChar from './ViewChar';
import ErrorMessage from '../errorMessage/ErrorMessage';

class RandomChar extends Component {
  marvelService = new MarvelService();

  constructor(props) {
    super(props);
    this.state = {
      char: {},
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    this.updateChar();
  }

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  onRandomCharClick = () => {
    this.setState({ loading: true });
    this.updateChar();
  };

  render() {
    const { char, loading, error } = this.state;

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <ViewChar char={char} /> : null;

    return (
      <div className="randomchar">
        {errorMessage}
        {spinner}
        {content}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button
            className="button button__main"
            type="button"
            onClick={this.onRandomCharClick}
          >
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

export default RandomChar;
