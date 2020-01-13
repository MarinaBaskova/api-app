import React, { useState } from "react";
import TagForm from "./TagForm";

export default function CharacterCard(props) {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const sum = props.grades.reduce(function(accumulator, currentValue) {
    let num = parseInt(currentValue, 10);
    return accumulator + num;
  }, 0);
  const averageGrade = sum / props.grades.length;

  let testList = [];
  for (let i = 0; i < props.grades.length; i++) {
    testList.push(
      <p key={i}>
        Test {i + 1} : {props.grades[i]} %
      </p>
    );
  }
  console.log("CARDS");
  return (
    <div className="character-card">
      {toggle ? (
        <button className="expand-btn" onClick={handleToggle}>
          -
        </button>
      ) : (
        <button className="expand-btn" onClick={handleToggle}>
          +
        </button>
      )}
      <div className="character-image-wrapper">
        <img
          className="character-image"
          src={props.pic}
          alt="character avatar"
        />
      </div>
      <div className="character-content-wrapper">
        <h2 className="character-header">
          {props.firstname} {props.lastname}
        </h2>
        <div className="character-content">
          <p>Email: {props.email}</p>
          <p>Company: {props.company}</p>
          <p>Skill: {props.skill}</p>
          <p>Average: {averageGrade}%</p>
        </div>
        {toggle && (
          <div className="extra-content">
            <div>{testList}</div>
            {props.tags &&
              props.tags.map((tag, index) => <div key={index}>{tag}</div>)}
            <TagForm addTag={props.addTag} index={props.index} />
          </div>
        )}
      </div>
    </div>
  );
}
