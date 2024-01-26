import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormicErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import './charSearchForm.scss';
import { useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharSearchForm = () => {
  const [character, setCharacter] = useState();
  const { loading, error, findCharacterByName, clearError } =
    useMarvelService();

  const findCharacter = (name) => {
    clearError();
    findCharacterByName(name).then(onCharacterLoaded);
  };

  const onCharacterLoaded = (character) => {
    setCharacter(character);
  };

  const errorMessage = error ? (
    <div className="char__search-critical-error">
      <ErrorMessage />
    </div>
  ) : null;
  const results = character ? (
    <div className="char__search-wrapper">
      <div className="char__search-success">
        There is! Visit {character.name} page?
      </div>
      <Link
        to={`/characters/${character.id}`}
        className="button button__secondary"
      >
        <div className="inner">To page</div>
      </Link>
    </div>
  ) : !error && character === null ? (
    <div className="char__search-error">
      The character was not found. Check the name and try again
    </div>
  ) : null;
  return (
    <>
      <Formik
        initialValues={{ name: '' }}
        onSubmit={({ name }) => {
          findCharacter(name);
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(3, 'Must be 3 characters or less')
            .max(15, 'Must be max 15 characters')
            .required('Required'),
        })}
      >
        <div className="char__search-form">
          <Form>
            <label className="char__search-label" htmlFor="name">
              Or find a character by name:
            </label>

            <div className="char__search-wrapper">
              <Field name="name" type="text" />
              <button
                className="button button__main"
                type="submit"
                disabled={loading}
              >
                <div className="inner">Find</div>
              </button>
            </div>

            <FormicErrorMessage name="name">
              {(msg) => <div className="char__search-error">{msg}</div>}
            </FormicErrorMessage>
          </Form>
        </div>
      </Formik>
      {errorMessage}
      {results}
    </>
  );
};

export default CharSearchForm;
