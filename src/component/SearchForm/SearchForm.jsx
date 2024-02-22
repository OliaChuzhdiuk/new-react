import { useState } from "react";
import s from "./SearchForm.module.css";
import PropTypes from "prop-types";

export default function SearchForm({ onSubmit }) {
  const [searchData, setSearchData] = useState("");

  const handleChange = (evt) => {
    const { value } = evt.currentTarget;
    setSearchData(value.toLowerCase());
    onSubmit(value.toLowerCase()); 
  };

  return (
    <header className={s.inputForm}>
      <form className={s.SearchForm__form}>
        <div className={s.inputIcon}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/650/650154.png"
            alt="Search Icon"
            width="24"
            height="24"
          />
        </div>

        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search your trip"
          value={searchData}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
