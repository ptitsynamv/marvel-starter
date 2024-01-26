import { useEffect, useState } from 'react';
import useMarvelService from '../../../services/MarvelService';
import { ErrorMessage } from 'formik';
import Spinner from '../../spinner/spinner';
import { useParams } from 'react-router-dom';
import AppBanner from '../../appBanner/AppBanner';

const SingleLayout = ({ BaseComponent, dataType }) => {
  const [data, setData] = useState(null);
  const { loading, error, getCharacter, getComic, clearError } = useMarvelService();
  const { id } = useParams();

  useEffect(() => {
    updateData();
  }, [id]);

  const updateData = () => {
    clearError();
    switch (dataType) {
      case 'char':
        getCharacter(id).then(onDataLoaded);
        break;
      case 'comic':
        getComic(id).then(onDataLoaded);
        break;
      default:
    }
  };

  const onDataLoaded = (data) => {
    setData(data);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !data) ? (
    <BaseComponent data={data} />
  ) : null;

  return (
    <>
      <AppBanner />
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

export default SingleLayout;
