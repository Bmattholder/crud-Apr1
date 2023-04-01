import React, { useEffect, useState } from "react";
import axios from "axios";
import Person from "./Person";

function PeopleList(props) {
  const [toggle, setToggle] = useState(false);
  const [list, setList] = useState([]);

  const toggleHelper = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    async function getData() {
      const res = await axios.get("http://localhost:8080/api/v1/people");
      const data = res.data;
      setList(data.content);
    }
    getData();
  });

  const peopleList = list.map((person) => {
    return (
      <Person
        id={person.id}
        firstName={person.personalName.givenNames[0].value}
        lastName={person.personalName.surname.value}
        address={person.address}
        toggleHelper={toggleHelper}
      />
    );
  });

  return <div>{peopleList}</div>;
}

export default PeopleList;
