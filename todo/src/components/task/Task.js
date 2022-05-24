import React, { useEffect, useState } from "react";
import "../task/task.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { deleteTask, updateTask } from "../../service/api";

import AddToDo from "../addtodo/AddToDo";
import { Link, useNavigate } from "react-router-dom";

function Task(props) {
  const [isUpdated, setIsUpdate] = useState(false);
  const [open, setOpen] = React.useState(false);

  const [taskObj, setTaskObj] = React.useState({
    id: props.item.id,
    taskname: props.item.taskname,
    priority: props.item.priority,
    status: props.item.status,
    last_modified: props.item.last_modified,
  });

  const handleDelete = async () => {
    await deleteTask(props.item.id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    props.handleUpdated();
  };
  const navigate = useNavigate();

  const handleClick = async () => {
    navigate("/", { state: taskObj });
  };

  return (
    <div className="card">
      <div className="taskname">{props.item.taskname}</div>
      <div className="priority1">{props.item.priority}</div>
      <div className="status1">{props.item.status}</div>
      <div className="lastmodified">{props.item.last_modified}</div>
      <div className="actionButton">
        <IconButton onClick={handleDelete}>
          <DeleteIcon></DeleteIcon>
        </IconButton>
        <IconButton onClick={handleClick}>
          <EditIcon />
        </IconButton>
      </div>
    </div>
  );
}
export default Task;
