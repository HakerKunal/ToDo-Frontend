import React, { useEffect, useState } from "react";
import { addTask, updateTask } from "../../service/api";
import "../addtodo/addtodo.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

function AddToDo(props) {
  const location = useLocation();
  const [updated, setUpdated] = useState(false);
  const [task, setTask] = useState({
    taskname: "",
    priority: "Low",
    status: "Not-Started",
    last_modified: "",
    id: "",
  });

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
    if (location.state == null) {
      if (task.taskname != "") {
        await setDateTime();
        await addTaskdetails();
        navigate("/dashboard", { state: { updated: true } });
      } else {
        alert("Task name should not be empty");
      }
    } else if (location.state != null) {
      if (task.taskname == "") {
        alert("Task Name should not be Nil");
      } else {
        await updateTask(task.id, task)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        navigate("/dashboard", { state: { updated: true } });
      }
    }
  };

  function updateTask1() {
    if (location.state == null) {
      console.log("no change");
    } else if (location.state != null) {
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
      <label className="heading">ADD TO DO...</label>
      <div className="innerbox">
        <div className="taskname1">
          <label className="heading-1">Task Name</label>
          <input
            type="text"
            value={task.taskname}
            onChange={handleTaskName}
          ></input>
        </div>
        <div className="priorit">
          <label className="heading-1">Priority</label>
          <select
            name="priority"
            onChange={handlePriority}
            value={task.priority}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="status">
          <label className="heading-1">Status</label>
          <select name="status" onChange={handleStatus} value={task.status}>
            <option value="Not-Started">Not-Started</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Done">Done</option>
          </select>
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
    </div>
  );
}
export default AddToDo;
