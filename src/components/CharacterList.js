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

  const addTag = (event, tag, id) => {
    console.log(tag, id);
    event.preventDefault();
    // console.log("ADD TO TAG", tag);
    // console.log("ADD TO", characters[id - 1].tags.push(tag));
    setCharacters([...characters, characters[id - 1].tags.push(tag)]);
    console.log("AFTER ADD TAG", characters);
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
        console.log("HERE", data);
        setCharacters(data);
      })
      .catch(err => {
        console.log("The data was not returned", err);
      });
  }, [query]);

  return (
    <div>
      <SearchTag />
      <SearchForm handleInputChange={handleInputChange} query={query} />
      <div className="caracter-card-wrapper">
        {characters.map(character => (
          <CharacterCard
            key={character.id}
            id={character.id}
            firstname={character.firstName}
            lastname={character.lastName}
            email={character.email}
            company={character.company}
            skill={character.skill}
            grades={character.grades}
            pic={character.pic}
            addTag={addTag}
          />
        ))}
      </div>
    </div>
  );
}
