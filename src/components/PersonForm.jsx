const PersonForm = (props) => {
  const addName = props.onSubmit;
  const inputChange = props.onChangeName;
  const inputChangeNum = props.onChangeNum;
  const newName = props.newName;
  const newNum = props.newNum;
  return (
    <>
      <form onSubmit={addName}>
        <div className="name">
          name: <input id="name" value={newName} onChange={inputChange} />
        </div>

        <div className="phone">
          phone: <input id="phone" value={newNum} onChange={inputChangeNum} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};
export default PersonForm;
