import Router from 'next/router';
import { Form, Formik } from 'formik';
import { ButtonSearchPrimary } from '../styled/button/styled';
import { FieldSearch } from '../styled/field/styled';
import { SearchIconLight } from '../styled/icons/boxicons';

import * as yup from 'yup';

const initialValues = {
  search: '',
};

const schema = yup.object({
  search: yup.string().min(1).required(),
});

export const Searcher = () => {
  const onSearch = (path: string) => {
    Router.push(`/search/${path}`);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => onSearch(values.search)}
      validationSchema={schema}
    >
      {({ handleChange }) => (
        <Form className="form-control mx-4 self-center w-full  max-w-[550px] flex relative">
          <FieldSearch
            type="text"
            placeholder="Search"
            onChange={handleChange}
            name="search"
            data-test="search-input"
          />

          <ButtonSearchPrimary
            type="submit"
            aria-label="button search"
            data-test="btn-search"
          >
            <SearchIconLight />
          </ButtonSearchPrimary>
        </Form>
      )}
    </Formik>
  );
};
