import React, { useState, useEffect } from "react";
import axios from "axios";
import CharacterCard from "./CharacterCard";
import SearchForm from "./SearchForm";
import SearchTag from "./SearchTag";

export default function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchTag, setSearchTag] = useState("");

  const handleNameChange = event => {
    setSearchName(event.target.value);
  };

  const handleTagChange = event => {
    setSearchTag(event.target.value);
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

    // let foundChar = { ...characters[index] };
    // console.log(foundChar);
    // foundChar.tags = [...foundChar.tags, tag];
    // let updatedChar = [...characters];
    // updatedChar[index] = foundChar;
    // setCharacters(updatedChar);
  };

  useEffect(() => {
    axios
      .get("https://www.hatchways.io/api/assessment/students")
      .then(res => {
        const data = res.data.students;
        // .filter(character => {
        // return (
        //   character.firstName.toLowerCase().includes(query.toLowerCase()) ||
        //   character.lastName.toLowerCase().includes(query.toLowerCase())
        // );
        // });
        for (let i = 0; i < data.length; i++) {
          data[i].tags = [];
        }
        setCharacters(data);
      })
      .catch(err => {
        console.log("The data was not returned", err);
      });
  }, []);

  function renderCharacters() {
    let results;
    if (searchName || searchTag) {
      const serchedResults = characters.filter(character => {
        let formatedTags = [];
        if (searchTag) {
          formatedTags = character.tags.filter(tag =>
            tag.includes(searchTag.toLowerCase())
          );
        }
        const searchFirstName = searchName
          ? character.firstName.toLowerCase().includes(searchName.toLowerCase())
          : false;
        const searchLastName = searchName
          ? character.lastName.toLowerCase().includes(searchName.toLowerCase())
          : false;
        const formatedTag = formatedTags.length ? true : false;
        return searchFirstName || searchLastName || formatedTag;
      });
      results = serchedResults;
      console.log("serchedResults =", serchedResults);
    } else {
      results = characters;
    }
    return results.map((character, index) => (
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
    ));
  }

  return (
    <div>
      <SearchTag handleTagChange={handleTagChange} searchTag={searchTag} />
      <SearchForm handleNameChange={handleNameChange} searchName={searchName} />
      <div className="caracter-card-wrapper">{renderCharacters()}</div>
    </div>
  );
}
