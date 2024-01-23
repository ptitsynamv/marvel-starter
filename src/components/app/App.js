import { useState } from 'react';
import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import ComicsList from '../comicsList/ComicsList';

import decoration from '../../resources/img/vision.png';

const App = () => {
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  function onCharSelected(id) {
    setSelectedCharacterId(id);
  }

  return (
    <div className="app">
      <AppHeader />
      <main>
        <ErrorBoundary>
          <RandomChar />
        </ErrorBoundary>
        <div className="char__content">
          <CharList onCharSelected={onCharSelected} />
          <ErrorBoundary>
            <CharInfo charId={selectedCharacterId} />
          </ErrorBoundary>
        </div>
        {/* <ComicsList></ComicsList> */}
        <img className="bg-decoration" src={decoration} alt="vision" />
      </main>
    </div>
  );
};

export default App;
