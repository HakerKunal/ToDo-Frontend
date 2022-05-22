import axios from 'axios'

const url = "http://localhost:3004/tasks";
export const getalltasks = async (id) => {
    id = id || '';
    return await axios.get(`${url}/${id}1`);
}

export const addTask = async (task) => {
    return await axios.post(url, task);
}