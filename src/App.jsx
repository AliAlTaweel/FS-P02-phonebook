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
    console.log("check01");
    services.getAll().then((x) => {
      setPersons(x);
    });
  }, [persons]);

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
      const checkPerosn = persons.find((person) => person.name === newName);
      if (checkPerosn.number === newNum) {
        alert(`${newName} is already added to phonebook`);
        return;
      } else {
        const x = window.confirm(
          `${checkPerosn.name} is already added to phonebook, replace the old number with a new one`
        );
        if (x) {
          checkPerosn.number = newNum;
          axios
            .put(`http://localhost:3002/persons/${checkPerosn.id}`, checkPerosn)
            .then(() => {
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
            });
        }
      }
    } else {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNum("");
      axios.post("http://localhost:3002/persons", newPerson).then(() => {
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
    if (event.target.value == "") {
      return "";
    }
    event.preventDefault();
    const searchName = event.target.value;
    setSearchResualt(
      persons.filter((person) =>
        person.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };
  const handleDelete = async (id, person) => {
    console.log(id);
    const deltetconfirm = window.confirm(`Delete ${person.name} ?`);
    if (deltetconfirm) {
      try {
        const response = await axios.delete(
          `http://localhost:3002/persons/${id}`
        );

        if (response.status === 200) {
          setAddedMessage(`${person.name} deleted successfully! `);
          setVisible(true);
          setTimeout(() => {
            setAddedMessage("");
            setVisible(false);
          }, 5000);

          setPersons(persons.filter((person) => person.id !== id));
        } else {
          alert("Failed to delete the item.");
        }
      } catch (error) {
        alert("Error occurred: " + error.message);
      }
    } else {
      alert("Delete action canceled.");
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
