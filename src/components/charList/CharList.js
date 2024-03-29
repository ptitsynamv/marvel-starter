import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import { ErrorMessage } from 'formik';

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

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const { getAllCharacters, stateProcess, setStateProcess } =
    useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    setNewItemLoading(!initial);

    getAllCharacters(offset)
      .then(onCharListLoaded)
      .then(() => setStateProcess('confirmed'));
  };

  const onCharListLoaded = async (newCharList) => {
    setCharList((charList) => [...charList, ...newCharList]);
    setNewItemLoading(false);
    setOffset((offset) => offset + 9);
    setCharEnded(newCharList.length < 9);
  };

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove('char__item_selected')
    );
    itemRefs.current[id].classList.add('char__item_selected');
    itemRefs.current[id].focus();
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imageStyle = { objectFit: 'cover' };
      if (item.thumbnail.indexOf('image_not_available') !== -1) {
        imageStyle = { objectFit: 'contain' };
      }

      return (
        <li
          className="char__item"
          tabIndex={0}
          ref={(el) => (itemRefs.current[i] = el)}
          key={item.id}
        >
          <button
            type="button"
            onClick={() => {
              props.onCharSelected(item.id);
              focusOnItem(i);
            }}
            onKeyPress={(e) => {
              if (e.key === '' || e.key === 'Enter') {
                props.onCharSelected(item.id);
                focusOnItem(i);
              }
            }}
          >
            <img src={item.thumbnail} alt={item.name} style={imageStyle} />
          </button>
          <ul className="char__name">{item.name}</ul>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  }

  return (
    <div className="char__list">
      {setContent(stateProcess, () => renderItems(charList), newItemLoading)}
      <button
        className="button button__main button__long"
        type="button"
        disabled={newItemLoading}
        style={{ display: charEnded ? 'none' : 'block' }}
        onClick={() => onRequest(offset, false)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
