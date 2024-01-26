import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/spinner';
import SingleComicPage from '../pages/singlePages/SingleComicPage';
import SingleCharPage from '../pages/singlePages/SingleCharPage';
import SingleLayout from '../pages/singleLayout/SingleLayout';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<MainPage />}></Route>
              <Route path="/comics" element={<ComicsPage />}></Route>
              <Route
                path="/comics/:id"
                element={
                  <SingleLayout
                    BaseComponent={SingleComicPage}
                    dataType="comic"
                  />
                }
              />
              <Route
                path="/characters/:id"
                element={
                  <SingleLayout
                    BaseComponent={SingleCharPage}
                    dataType="char"
                  />
                }
              />
              <Route path="*" element={<Page404 />}></Route>
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
