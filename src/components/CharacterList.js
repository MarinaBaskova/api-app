import React, { useState, useEffect } from "react";
import axios from "axios";
import CharacterCard from "./CharacterCard";

export default function CharacterList() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.hatchways.io/api/assessment/students")
      .then(res => {
        setCharacters(res.data.students);
      })
      .catch(err => {
        console.log("The data was not returned", err);
      });
  }, []);

  return (
    <div>
      {characters.map(character => (
        <CharacterCard
          key={character.id}
          firstname={character.firstName}
          lastname={character.lastName}
          email={character.email}
          company={character.company}
          skill={character.skill}
          grades={character.grades}
          pic={character.pic}
        />
      ))}
    </div>
  );
}

// city: "Fushë-Muhurr"
// company: "Yadel"
// email: "iorton0@imdb.com"
// firstName: "Ingaberg"
// grades: (8) ["78", "100", "92", "86", "89", "88", "91", "87"]
// id: "1"
// lastName: "Orton"
// pic: "https://storage.googleapis.com/hatchways-app.appspot.com/assessments/data/frontend/images/voluptasdictablanditiis.jpg"
// skill: "Oracle"
