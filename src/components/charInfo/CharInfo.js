import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, []);

  useEffect(() => {
    updateChar();
  }, [props.charId]);

  const updateChar = () => {
    if (!props.charId) {
      return;
    }
    clearError();
    getCharacter(props.charId).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

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
};

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
          {comics.slice(0, 10).map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li className="char__comics-item" key={index}>
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
