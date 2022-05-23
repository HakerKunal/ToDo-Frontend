import axios from 'axios'

const url = "http://localhost:3004/tasks";
export const getalltasks = async (id) => {
    id = id || '';
    return await axios.get(`${url}/${id}1`);
}

export const addTask = async (task) => {
    return await axios.post(url, task);
}

export const updateTask = async (id, task) => {
    return await axios.put(`${url}/${id}`, task);

}

export const deleteTask = async (id) => {
    return await axios.delete(`${url}/${id}`);
}