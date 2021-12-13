import action from './action';
import axios from 'axios';

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log({ error });
    if (error?.response?.data?.code === 401) {
      localStorage.clear();
      window.location.reload();
    }
  }
)

const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

const getBoadrs = () => dispatch => {
  dispatch(action.getBoadrsRequest());

  axios.get('https://board-apiapp.herokuapp.com/api/boards')
    .then(response => dispatch(action.getBoadrsSuccess(response.data.items)))
    .catch(error => dispatch(action.getBoadrsError(error.message)));
}

const editTask = (data, id) => dispatch => {
  axios.put(`https://board-apiapp.herokuapp.com/api/tasks/${id}`, data)
    .then(response => dispatch(action.getBoadrsSuccess(response.data.items)))
    .catch(error => dispatch(action.getBoadrsError(error.message)));
}

const addTask = (data) => dispatch => {
  axios.post(`https://board-apiapp.herokuapp.com/api/tasks`, data)
    .then(response => dispatch(action.getBoadrsSuccess(response.data.items)))
    .catch(error => dispatch(action.getBoadrsError(error.message)));
}

const changeTaskBoard = data => dispatch => {
  axios.post(`https://board-apiapp.herokuapp.com/api/tasks/change`, data)
    .then(response => dispatch(action.getBoadrsSuccess(response.data.items)))
    .catch(error => dispatch(action.getBoadrsError(error.message)));
}

const deleteTask = taskId => dispatch => {
  axios.delete(`https://board-apiapp.herokuapp.com/api/tasks/${taskId}`)
    .then(response => dispatch(action.getBoadrsSuccess(response.data.items)))
    .catch(error => dispatch(action.getBoadrsError(error.message)));
}

const changePosition = (taskId, data) => dispatch => {
  axios.put(`https://board-apiapp.herokuapp.com/api/tasks/position/${taskId}`, data)
    .then(response => dispatch(action.getBoadrsSuccess(response.data.items)))
    .catch(error => dispatch(action.getBoadrsError(error.message)));
}

export default {
  getBoadrs,
  addTask,
  editTask,
  changeTaskBoard,
  deleteTask,
  changePosition
}