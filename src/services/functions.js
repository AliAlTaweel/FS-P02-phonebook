import axios from "axios";
const baseUrl = "http://localhost:3002/persons";

const getAll = () => {
  const request = axios.get(baseUrl).then((request) => {
    return request.data;
  });

  return request;
};

export default { getAll };
