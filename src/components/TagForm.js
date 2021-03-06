import React, { useState } from "react";

export default function TagForm(props) {
  const [inputVal, setInputVal] = useState("");

  const handleChanges = event => {
    setInputVal(event.target.value);
  };
  const submitTag = event => {
    event.preventDefault();
    setInputVal("");
    props.addTag(event, inputVal, props.index);
  };

  return (
    <div>
      <form onSubmit={submitTag}>
        <input
          type="text"
          value={inputVal}
          name="inputVal"
          onChange={handleChanges}
          placeholder="Add Tag"
          className="add-tag-input"
          required
        />
      </form>
    </div>
  );
}
