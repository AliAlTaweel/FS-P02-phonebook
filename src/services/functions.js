import axios from "axios";
const baseUrl = "http://localhost:3302/persons";

const getAll = () => {
  const request = axios.get(baseUrl).then((request) => request.data);
  return request;
};

const update = (checkPerosn) => {
  const x = axios.put(`${baseUrl}/${checkPerosn.id}`, checkPerosn);
  return x.then((respnse) => respnse.data);
};

const deleteUser = async (id) => {
  const d = axios.delete(`${baseUrl}/${id}`);
  const response = await d;
  return response.data;
};

const celenNameNum = (setNewName,setNewNum) => {
  setNewName("");
  setNewNum("");
};

export default { getAll, update, deleteUser, celenNameNum };
