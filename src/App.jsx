import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import axios from "axios";
import services from "./services/functions";
import Notification from "./components/Notification";
const App = () => {
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [persons, setPersons] = useState([]);
  const [searchResult, setSearchResualt] = useState([]);
  const [addedMessage, setAddedMessage] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    services.getAll().then((x) => {
      setPersons(x);
    });
  }, []);

  const inputChange = (event) => {
    setNewName(event.target.value);
  };
  const inputChangeNum = (event) => {
    setNewNum(event.target.value);
  };
  const addName = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNum,
    };

    if (persons.some((person) => person.name === newName)) {
      const checkPerson = persons.find((person) => person.name === newName);

      if (checkPerson.number === newNum) {
        alert(`${newName} is already added to phonebook`);
        return;
      } else {
        const x = window.confirm(
          `${checkPerson.name} is already added to phonebook, replace the old number with a new one`
        );
        if (x) {
          const updatedPerson = {...checkPerson,number:newNum};
        
          services
            .update(updatedPerson)
            .then((returnPerson) => {
              setPersons(
                persons.map((p) => (p.id !== checkPerson.id ? p : returnPerson))
              );

              setAddedMessage(`Udated ${newName}`);
              setVisible(true);
              setTimeout(() => {
                setVisible(false);
                setAddedMessage("");
              }, 5000);
            })
            .catch(() => {
              setAddedMessage(
                `Information of ${newName} has been already been removed from the server`
              );
              setVisible(true);
              setTimeout(() => {
                setVisible(false);
                setAddedMessage("");
              }, 5000);
              setPersons(persons.filter((person) => person.name !== newName));
              services.celenNameNum(setNewName, setNewNum);
            });
        }
      }
    } else {
      axios.post("http://localhost:3302/persons", newPerson).then(() => {
        setPersons(persons.concat(newPerson));
        services.celenNameNum(setNewName, setNewNum);
        setAddedMessage(`Added ${newName}`);
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
          setAddedMessage("");
        }, 5000);
      });
    }
  };
  const handleSerach = (event) => {
    const searchName = event.target.value.trim();
    if (searchName === "") {
      setSearchResualt([]);
      return;
    }
    setSearchResualt(
      persons.filter((person) =>
        person.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };
  const handleDelete = (id, person) => {
    const deltetconfirm = window.confirm(`Delete ${person.name} ?`);
    if (deltetconfirm) {
      services
        .deleteUser(id)
        .then(() => {
          setAddedMessage(`${person.name} deleted successfully! `);
          setVisible(true);
          setTimeout(() => {
            setAddedMessage("");
            setVisible(false);
          }, 5000);

          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {});
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addedMessage} visible={visible} />
      <Filter onChange={handleSerach} />

      <h2>add a new</h2>
      <PersonForm
        onSubmit={addName}
        onChangeName={inputChange}
        onChangeNum={inputChangeNum}
        newName={newName}
        newNum={newNum}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} handleDelete={handleDelete} />

      <h2>Search Reasult</h2>
      <Persons persons={searchResult} handleDelete={handleDelete} />
    </div>
  );
};
export default App;
