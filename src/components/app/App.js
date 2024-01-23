import { Component } from 'react';
import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCharacterId: null,
    };
  }

  onCharSelected = (id) => {
    this.setState({ selectedCharacterId: id });
  };

  render() {
    const { selectedCharacterId } = this.state;
    return (
      <div className="app">
        <AppHeader />
        <main>
          <ErrorBoundary>
            <RandomChar />
          </ErrorBoundary>
          <div className="char__content">
            <CharList onCharSelected={this.onCharSelected} />
            <ErrorBoundary>
              <CharInfo charId={selectedCharacterId} />
            </ErrorBoundary>
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    );
  }
}

export default App;
