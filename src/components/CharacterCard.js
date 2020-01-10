import React from "react";

export default function CharacterCard(props) {
  const sum = props.grades.reduce(function(accumulator, currentValue) {
    let num = parseInt(currentValue, 10);
    return accumulator + num;
  }, 0);
  const averageGrade = sum / props.grades.length;

  return (
    <div>
      <img src={props.pic} alt="character image" />
      <h2>
        {props.firstname} {props.lastname}
      </h2>
      <p>Email: {props.email}</p>
      <p>Company: {props.company}</p>
      <p>Skill: {props.skill}</p>
      <p>Average: {averageGrade}%</p>
    </div>
  );
}
