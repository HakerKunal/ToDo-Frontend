import React from "react";
import '../task/task.css'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Task(props) {

    return (
        <div className="card">
            <div className="taskname">
                {props.item.taskname}
            </div>
            <div className="priority1">{props.item.priority}</div>
            <div>{props.item.status}</div>
            <div>{props.item.lastmodified}</div>
            <div className="actionButton">
                <DeleteIcon />
                <EditIcon />
            </div>



        </div >
    )
}
export default Task