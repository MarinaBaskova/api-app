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

  const addTag = (event, tag, id, index) => {
    event.preventDefault();
    // console.log("ADD TO TAG", tag);
    // console.log("ADD TO", characters[id - 1].tags.push(tag));

    console.log("ID/INDEX TO ADD TAG FOR", id, index);
    characters[index].tags.push(tag);
    setCharacters(characters);
    console.log("AFTER ADDED TAG", characters);
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

        console.log("->>> DATA FROM API ", data);
        setCharacters(data);
        console.log("=====>", characters);
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
            id={character.id}
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
