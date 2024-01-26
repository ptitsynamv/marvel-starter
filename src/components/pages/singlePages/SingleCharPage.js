import './singlePage.scss';

const SingleCharPage = ({ data }) => {
  return (
    <div className="single-comic">
      <img src={data.thumbnail} alt={data.name} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{data.name}</h2>
        <p className="single-comic__descr">{data.description}</p>
      </div>
    </div>
  );
};

export default SingleCharPage;
