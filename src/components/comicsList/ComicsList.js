import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const setContent = (stateProcess, Component, newItemLoading) => {
  switch (stateProcess) {
    case 'waiting':
      return <Spinner />;
    case 'loading':
      return newItemLoading ? <Component /> : <Spinner />;
    case 'confirmed':
      return <Component />;
    case 'error':
      return <ErrorMessage />;
    default:
      throw new Error('Unexpected stateProcess state');
  }
};

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const [offset, setOffset] = useState(0);
  const [newComicsLoading, setNewComicsLoading] = useState(false);
  const [comicEnded, setComicEnded] = useState(false);

  const { getComics, stateProcess, setStateProcess } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    setNewComicsLoading(!initial);

    getComics(offset)
      .then(onComicsLoaded)
      .then(() => setStateProcess('confirmed'));
  };

  const onComicsLoaded = (newComics) => {
    setComics((comics) => [...comics, ...newComics]);
    setNewComicsLoading(false);
    setOffset((offset) => offset + 8);
    setComicEnded(newComics.length < 9);
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imageStyle = { objectFit: 'cover' };
      if (item.thumbnail.indexOf('image_not_available') !== -1) {
        imageStyle = { objectFit: 'contain' };
      }

      return (
        <li className="comics__item" key={i}>
          <Link to={`${item.id}`}>
            <img
              src={item.thumbnail}
              alt={item.title}
              className="comics__item-img"
              style={imageStyle}
            />
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}$</div>
          </Link>
        </li>
      );
    });

    return <ul className="comics__grid">{items}</ul>;
  }

  return (
    <div className="comics__list">
      {setContent(stateProcess, () => renderItems(comics), newComicsLoading)}
      <button
        className="button button__main button__long"
        type="button"
        disabled={newComicsLoading}
        style={{ display: comicEnded ? 'none' : 'block' }}
        onClick={() => onRequest(offset, false)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
