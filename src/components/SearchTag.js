import React from "react";

export default function SearchTag(props) {
  return (
    <div>
      <form className="search-tag">
        <input
          id="tag-input"
          type="text"
          onChange={props.handleTagChange}
          value={props.searchTag}
          name="text-input"
          placeholder="search by tags"
        />
      </form>
    </div>
  );
}
