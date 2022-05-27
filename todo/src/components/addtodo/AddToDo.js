import React, { useEffect, useState } from "react";
import { addTask, updateTask } from "../../service/api";
import "../addtodo/addtodo.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";

function AddToDo(props) {
  const location = useLocation();
  const [task, setTask] = useState({
    taskname: "",
    priority: "Low",
    status: "Not-Started",
    last_modified: "",
    id: "",
  });
  const [errorText, setErrorText] = React.useState();
  const addTaskdetails = async () => {
    await addTask(task);
  };

  const handleTaskName = (event) => {
    setTask({ ...task, taskname: event.target.value });
  };
  const handlePriority = (event) => {
    setTask({ ...task, priority: event.target.value });
  };
  const handleStatus = (event) => {
    setTask({ ...task, status: event.target.value });
  };
  const setDateTime = async () => {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;

    setTask({ ...task, last_modified: dateTime });
  };
  useEffect(() => {
    setDateTime();
  }, [task.priority, task.status, task.taskname]);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (location.state === null) {
      if (task.taskname !== "") {
        await setDateTime();
        await addTaskdetails();
        setErrorText("");
        navigate("/dashboard", { state: { updated: true } });
      } else {
        setErrorText("task name should not be empty");
      }
    } else if (location.state !== null) {
      if (task.taskname === "") {
        setErrorText("task name should not be empty");
      } else {
        await updateTask(task.id, task)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        setErrorText("");
        navigate("/dashboard", { state: { updated: true } });
      }
    }
  };

  function updateTask1() {
    if (location.state === null) {
      console.log("no change");
    } else if (location.state !== null) {
      setTask({
        ...task,
        id: location.state.id,
        taskname: location.state.taskname,
        priority: location.state.priority,
        status: location.state.status,
      });
    }
  }

  useEffect(() => {
    updateTask1();
  }, [location.state]);

  return (
    <div className="outerbox">
      <label className="heading">ADD TO DO</label>
      <div className="task-name-box">
        <TextField
          className="task-name"
          label="Task Name"
          variant="outlined"
          value={task.taskname}
          onChange={handleTaskName}
          size="small"
          required="true"
          helperText={errorText}
          error={errorText}
        />
      </div>
      <div className="priority-box">
        <InputLabel id="demo-simple-select-helper-label">Priority</InputLabel>
        <Select
          className="priority-select"
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={task.priority}
          label="Priority"
          onChange={handlePriority}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </div>
      <div className="status-box">
        <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
        <Select
          className="status-select"
          onChange={handleStatus}
          value={task.status}
          label="Status"
        >
          <MenuItem value="Not-Started">Not-Started</MenuItem>
          <MenuItem value="In-Progress">In-Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </Select>
      </div>
      <div className="buttons">
        <Button
          variant="contained"
          className="addButton"
          onClick={handleSubmit}
        >
          Save
        </Button>
        <Link to="/dashboard">
          {" "}
          <Button variant="contained" className="addButton" color="secondary">
            Close
          </Button>
        </Link>
      </div>
    </div>
  );
}
export default AddToDo;
