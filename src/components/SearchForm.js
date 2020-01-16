import React from "react";

export default function SearchForm(props) {
  return (
    <div>
      <form className="search">
        <input
          id="name-input"
          type="text"
          onChange={props.handleNameChange}
          value={props.searchName}
          name="text-input"
          placeholder="search by name"
        />
      </form>
    </div>
  );
}
