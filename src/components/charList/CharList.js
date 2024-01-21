import { Component } from 'react';
import './charList.scss';
import MarvelService from '../../services/MarvelService';

class CharList extends Component {
  marvelService = new MarvelService();

  constructor(props) {
    super(props);
    this.state = {
      characters: [],
    };
  }

  componentDidMount() {
    this.marvelService.getAllCharacters().then(this.initCharacters);
  }

  initCharacters = (res) => {
    this.setState({ characters: res });
  };

  render() {
    const { characters } = this.state;
    const { onCharSelected } = this.props;

    const charactersElements = characters.map((char) => (
      <li className="char__item" key={char.id}>
        <button type="button" onClick={() => onCharSelected(char.id)}>
          <img src={char.thumbnail} alt={char.name} />
        </button>
        <div className="char__name">{char.name}</div>
      </li>
    ));

    return (
      <div className="char__list">
        <ul className="char__grid">
          {charactersElements}
          {/* <li className="char__item char__item_selected">
            <img src={abyss} alt="abyss" />
            <div className="char__name">Abyss</div>
          </li> */}
        </ul>
        <button className="button button__main button__long" type="button">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}
export default CharList;
