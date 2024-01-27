import { useState, useEffect } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ViewChar from './ViewChar';
import ErrorMessage from '../errorMessage/ErrorMessage';
import setContent from '../../utils/setContent';

const RandomChar = (props) => {
  const [char, setChar] = useState({});

  const { getCharacter, clearError, stateProcess, setStateProcess } =
    useMarvelService();

  useEffect(() => {
    updateChar();
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

    getCharacter(id)
      .then(onCharLoaded)
      .then(() => setStateProcess('confirmed'));
  };

  const onRandomCharClick = () => {
    updateChar();
  };

  return (
    <div className="randomchar">
      {setContent(stateProcess, ViewChar, char)}
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
          onClick={onRandomCharClick}
        >
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

export default RandomChar;
