import React, { useState, useEffect } from "react";
import axios from "axios";
import CharacterCard from "./CharacterCard";
import SearchForm from "./SearchForm";
import SearchTag from "./SearchTag";

export default function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [query, setQuery] = useState("");

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  const addTag = (event, tag, index) => {
    event.preventDefault();
    let tagsCopy = [...characters[index].tags];
    let objCopy = Object.assign({}, characters[index]);
    objCopy.tags = tagsCopy;
    objCopy.tags.push(tag);
    let charactersCopy = [...characters];
    charactersCopy[index] = objCopy;
    setCharacters(charactersCopy);
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
        //add tags array for each character
        for (let i = 0; i < data.length; i++) {
          data[i].tags = [];
        }
        console.log("STATE RERENDER API");
        setCharacters(data);
      })
      .catch(err => {
        console.log("The data was not returned", err);
      });
  }, [query]);

  console.log("LIST TO RENDER", characters);
  return (
    <div>
      <SearchTag />
      <SearchForm handleInputChange={handleInputChange} query={query} />
      <div className="caracter-card-wrapper">
        {characters.map((character, index) => (
          <CharacterCard
            key={character.id}
            index={index}
            firstname={character.firstName}
            lastname={character.lastName}
            email={character.email}
            company={character.company}
            skill={character.skill}
            grades={character.grades}
            pic={character.pic}
            tags={character.tags}
            addTag={addTag}
          />
        ))}
      </div>
    </div>
  );
}
