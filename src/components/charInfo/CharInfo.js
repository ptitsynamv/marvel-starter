import { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';
import MarvelService from '../../services/MarvelService';

class CharInfo extends Component {
  marvelService = new MarvelService();

  constructor(props) {
    super(props);
    this.state = {
      char: null,
      loading: false,
      error: false,
    };
  }

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    const { charId } = this.props;
    if (charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  onCharLoading = () => {
    this.setState({ loading: true });
  };

  updateChar = () => {
    const { charId } = this.props;
    if (!charId) {
      return;
    }
    this.onCharLoading();

    this.marvelService
      .getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  render() {
    const { char, loading, error } = this.state;

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;
    return (
      <div className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  const ojectFitStyle =
    thumbnail.indexOf('image_not_available') !== -1 ? 'contain' : 'cover';

  return (
    <>
      <div className="char__basics">
        <img
          src={thumbnail}
          alt={name}
          style={{
            objectFit: ojectFitStyle,
          }}
        />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      {comics.length ? (
        <ul className="char__comics-list">
          {comics.slice(0, 10).map((item, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <li className="char__comics-item" key={i}>
              {item.name}
            </li>
          ))}
        </ul>
      ) : (
        'Empty comics'
      )}
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;
