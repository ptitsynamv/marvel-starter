import { useHttp } from '../components/hooks/http.hook';

const useMarvelService = () => {
  const { request, clearError, stateProcess, setStateProcess } = useHttp();

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = `apikey=${process.env.REACT_APP_MARVEL_API_KEY}`;
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getComics = async (offset = 0) => {
    const res = await request(
      `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map((item) => _transformComics(item));
  };

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  const findCharacterByName = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
    return res.data.results.length
      ? _transformCharacter(res.data.results[0])
      : null;
  };

  const _transformCharacter = (character) => ({
    id: character.id,
    name: character.name,
    description: character.description,
    thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
    homepage: character.urls[0].url,
    wiki: character.urls[1].url,
    comics: character.comics.items,
  });

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
      price: comics.prices[0].price,
      description: comics.textObjects[0]?.text,
      pageCount: comics.pageCount,
      language: comics.textObjects[0]?.language,
    };
  };

  return {
    stateProcess,
    setStateProcess,
    getAllCharacters,
    getCharacter,
    clearError,
    getComics,
    getComic,
    findCharacterByName,
  };
};

export default useMarvelService;
