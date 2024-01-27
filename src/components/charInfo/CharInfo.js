import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const { getCharacter, clearError, stateProcess, setStateProcess } =
    useMarvelService();

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
    getCharacter(props.charId)
      .then(onCharLoaded)
      .then(() => setStateProcess('confirmed'));
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  return (
    <div className="char__info">{setContent(stateProcess, View, char)}</div>
  );
};

const View = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = data;
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
