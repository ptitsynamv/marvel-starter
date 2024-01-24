import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const [offset, setOffset] = useState(0);
  const [newComicsLoading, setNewComicsLoading] = useState(false);
  const { error, loading, getComics } = useMarvelService();

  useEffect(() => {
    loadComics();
  }, []);

  const loadComics = (initial) => {
    setNewComicsLoading(!initial);
    getComics(offset).then(onComicsLoaded);
  };

  const onComicsLoaded = (newComics) => {
    setNewComicsLoading(false);
    setComics((comics) => [...comics, ...newComics]);
    setOffset((offset) => offset + 8);
  };

  const onLoadMoreClick = () => {
    loadComics(false);
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

  const spinner = loading && !newComicsLoading ? <Spinner></Spinner> : null;
  const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;

  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      {renderItems(comics)}
      <button
        className="button button__main button__long"
        type="button"
        disabled={newComicsLoading}
        onClick={onLoadMoreClick}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
