import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div>
      <ErrorMessage />
      <p>404</p>
      <Link to="/">Back to main page</Link>
    </div>
  );
};

export default Page404;
