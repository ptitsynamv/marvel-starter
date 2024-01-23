import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './charList.scss';
import MarvelService from '../../services/MarvelService';

class CharList extends Component {
  marvelService = new MarvelService();

  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      loading: true,
      error: false,
      newItemLoading: false,
      offset: 210,
      charEnded: false,
    };
  }

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (offset) => {
    this.onCharListLoading();

    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError);
  };

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  onCharListLoading = () => {
    this.setState({ newItemLoading: true });
  };

  onCharListLoaded = (newCharacters) => {
    this.setState(({ characters, offset }) => ({
      characters: [...characters, ...newCharacters],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: newCharacters.length < 9,
    }));
  };

  render() {
    const { characters, newItemLoading, offset, charEnded } = this.state;
    const { onCharSelected } = this.props;

    const charactersElements = characters.map((char) => (
      <CharListElement
        key={char.id}
        char={char}
        onCharSelected={onCharSelected}
      />
    ));

    return (
      <div className="char__list">
        <ul className="char__grid">{charactersElements}</ul>
        <button
          className="button button__main button__long"
          type="button"
          disabled={newItemLoading}
          style={{ display: charEnded ? 'none' : 'block' }}
          onClick={() => this.onRequest(offset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

class CharListElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
  }

  onFocus = () => {
    this.setState({ isFocused: true });
  };

  onBlur = () => {
    this.setState({ isFocused: false });
  };

  render() {
    const { onCharSelected, char } = this.props;
    const { isFocused } = this.state;

    return (
      <li
        className={`char__item${isFocused ? ' char__item_selected' : ''}`}
        key={char.id}
      >
        <button
          type="button"
          onClick={() => onCharSelected(char.id)}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        >
          <img src={char.thumbnail} alt={char.name} />
        </button>
        <div className="char__name">{char.name}</div>
      </li>
    );
  }
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
