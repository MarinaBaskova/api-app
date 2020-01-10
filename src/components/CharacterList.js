import React, { useState, useEffect } from "react";
import axios from "axios";
import CharacterCard from "./CharacterCard";
import SearchForm from "./SearchForm";

export default function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [query, setQuery] = useState("");

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    axios
      .get("https://www.hatchways.io/api/assessment/students")
      .then(res => {
        const data = res.data.students.filter(character => {
          return (
            character.firstName.toLowerCase().includes(query.toLowerCase()) ||
            character.lastName.toLowerCase().includes(query.toLowerCase())
          );
        });
        setCharacters(data);

        console.log(data);
      })
      .catch(err => {
        console.log("The data was not returned", err);
      });
  }, [query]);

  return (
    <div>
      <SearchForm handleInputChange={handleInputChange} query={query} />
      <div className="caracter-card-wrapper">
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
    </div>
  );
}
