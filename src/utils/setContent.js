import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Skeleton from '../components/skeleton/Skeleton';
import Spinner from '../components/spinner/spinner';

const setContent = (stateProcess, Component, data) => {
  switch (stateProcess) {
    case 'waiting':
      return <Skeleton />;
    case 'loading':
      return <Spinner />;
    case 'confirmed':
      return <Component data={data} />;
    case 'error':
      return <ErrorMessage />;
    default:
      throw new Error('Unexpected stateProcess state');
  }
};

export default setContent;
