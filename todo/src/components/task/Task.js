import React, { useState } from "react";
import '../task/task.css'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';




function Task(props) {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }


    return (
        <div className="card">
            <div className="taskname">
                {props.item.taskname}
            </div>
            <div className="priority1">{props.item.priority}</div>
            <div className="status1">{props.item.status}</div>
            <div className="lastmodified">{props.item.last_modified}</div>
            <div className="actionButton">
                <DeleteIcon ><button onClick={togglePopup}></button></DeleteIcon>
                <EditIcon />
            </div>



        </div >
    )
}
export default Task