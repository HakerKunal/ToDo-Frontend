import React, { useEffect, useState } from "react";
import "../task/task.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { deleteTask, updateTask } from "../../service/api";

import { useNavigate } from "react-router-dom";

function Task(props) {
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
