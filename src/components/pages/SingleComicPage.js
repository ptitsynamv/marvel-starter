import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/spinner';

import './singleComicPage.scss';

const SingleComicPage = () => {
  const [comic, setComic] = useState(null);
  const { loading, error, getComic, clearError } = useMarvelService();
  const { comicsId } = useParams();

  useEffect(() => {
    updateComic();
  }, [comicsId]);

  const updateComic = () => {
    clearError();
    getComic(comicsId).then(onComicLoaded);
  };

  const onComicLoaded = (comic) => {
    setComic(comic);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View = ({ comic }) => {
  return (
    <div className="single-comic">
      <img
        src={comic.thumbnail}
        alt={comic.title}
        className="single-comic__img"
      />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{comic.title}</h2>
        <p className="single-comic__descr">{comic.description}</p>
        <p className="single-comic__descr">{comic.pageCount} pages</p>
        <p className="single-comic__descr">Language: {comic.language}</p>
        <div className="single-comic__price">{comic.price}$</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicPage;
