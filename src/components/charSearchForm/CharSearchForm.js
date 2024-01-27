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

const setContent = (stateProcess, data) => {
  switch (stateProcess) {
    case 'waiting':
      return null;
    case 'loading':
      return null;
    case 'confirmed':
      return data === null ? (
        <div className="char__search-error">
          The character was not found. Check the name and try again
        </div>
      ) : (
        <div className="char__search-wrapper">
          <div className="char__search-success">
            There is! Visit {data.name} page?
          </div>
          <Link
            to={`/characters/${data.id}`}
            className="button button__secondary"
          >
            <div className="inner">To page</div>
          </Link>
        </div>
      );
    case 'error':
      return (
        <div className="char__search-critical-error">
          <ErrorMessage />
        </div>
      );
    default:
      throw new Error('Unexpected stateProcess state');
  }
};

const CharSearchForm = () => {
  const [character, setCharacter] = useState();
  const { findCharacterByName, clearError, stateProcess, setStateProcess } =
    useMarvelService();

  const findCharacter = (name) => {
    clearError();
    findCharacterByName(name)
      .then(onCharacterLoaded)
      .then(() => setStateProcess('confirmed'));
  };

  const onCharacterLoaded = (character) => {
    setCharacter(character);
  };

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
                disabled={stateProcess === 'loading'}
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
      {setContent(stateProcess, character)}
    </>
  );
};

export default CharSearchForm;
