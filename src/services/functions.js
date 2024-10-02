import axios from "axios";
const baseUrl = "http://localhost:3002/persons";

const getAll = () => {
  const request = axios.get(baseUrl).then((request) => {
    return request.data;
  });
  return request;
};

const disp = (text, name) => {
  console.log(`${text} ${name}`);
  setAddedMessage(`${text} ${name}`);
  setTimeout(() => {
    setAddedMessage(null);
  }, 5000);
};

export default { getAll, disp };
