import { useEffect, useState } from 'react';
import useMarvelService from '../../../services/MarvelService';
import { ErrorMessage } from 'formik';
import Spinner from '../../spinner/spinner';
import { useParams } from 'react-router-dom';
import AppBanner from '../../appBanner/AppBanner';
import setContent from '../../../utils/setContent';

const SingleLayout = ({ BaseComponent, dataType }) => {
  const [data, setData] = useState(null);
  const {
    loading,
    error,
    getCharacter,
    getComic,
    clearError,
    stateProcess,
    setStateProcess,
  } = useMarvelService();
  const { id } = useParams();

  useEffect(() => {
    updateData();
  }, [id]);

  const updateData = () => {
    clearError();
    switch (dataType) {
      case 'char':
        getCharacter(id)
          .then(onDataLoaded)
          .then(() => setStateProcess('confirmed'));
        break;
      case 'comic':
        getComic(id)
          .then(onDataLoaded)
          .then(() => setStateProcess('confirmed'));
        break;
      default:
    }
  };

  const onDataLoaded = (data) => {
    setData(data);
  };

  return (
    <>
      <AppBanner />
      {setContent(stateProcess, BaseComponent, data)}
    </>
  );
};

export default SingleLayout;
