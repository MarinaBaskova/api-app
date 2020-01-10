import React from "react";

export default function SearchForm(props) {
  return (
    <div>
      <form className="search">
        <input
          id="name-input"
          type="text"
          onChange={props.handleInputChange}
          value={props.query}
          name="text-input"
          placeholder="search"
        />
      </form>
    </div>
  );
}
