import React from "react";

export default function CharacterCard(props) {
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

  return (
    <div className="character-card">
      <div className="character-image-wrapper">
        <img
          className="character-image"
          src={props.pic}
          alt="character image"
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
        <div className="extra-content">
          <div>{testList}</div>
        </div>
      </div>
    </div>
  );
}
