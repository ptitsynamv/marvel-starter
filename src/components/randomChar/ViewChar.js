const ViewChar = ({ char }) => {
  const emptyInfo = 'This is empty';

  const { name, description, thumbnail, homepage, wiki } = char;
  const imageoOjectFitStyle = thumbnail.indexOf('image_not_available') !== -1 ? 'contain' : 'cover';

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={{
          objectFit: imageoOjectFitStyle,
        }}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description ?? emptyInfo}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ViewChar;