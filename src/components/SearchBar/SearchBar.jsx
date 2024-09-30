import { Field, Form, Formik } from "formik";
import style from "./SearchBar.module.css";

const SearchBar = ({ handleChangeQuery }) => {
  const initialValues = {
    query: "",
  };

  const handleSubmit = (values) => {
    handleChangeQuery(values.query);
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={style.form}>
          <Field className={style.input} name="query" />
          <button className={style.formBtn} type="submit">
            Search
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchBar;
