const Persons = (props) => {
    const persons = props.persons
  return (
    <>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>
            {person.name} {person.number}
            <button onClick={()=> props.handleDelete(person.id,person)}> delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};
export default Persons;
