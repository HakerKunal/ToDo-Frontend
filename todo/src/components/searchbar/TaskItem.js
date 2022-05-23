import React, { useEffect, useState } from "react";
import '../task/task.css'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { deleteTask, updateTask } from "../../service/api";





function Task(props) {
    const [isUpdated, setIsUpdate] = useState(false)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [taskObj, setTaskObj] = React.useState({ id: "", taskname: "", priority: "", status: "", last_modified: "" })

    const assignTaskObj = () => {
        setTaskObj({ ...taskObj, id: props.item.id, taskname: props.item.taskname, priority: props.item.priority, status: props.item.status, last_modified: props.item.last_modified })
    }
    useEffect(() => { assignTaskObj() }, [open])
    const takeTaskName = (event) => {
        setTaskObj({ ...taskObj, taskname: event.target.value })
        setIsUpdate(true)
    }
    const takePriority = (event) => {
        setTaskObj({ ...taskObj, priority: event.target.value })
        setIsUpdate(true)
    }
    const takeStatus = (event) => {
        setTaskObj({ ...taskObj, status: event.target.value })
        setIsUpdate(true)
    }
    const setDateTime = async () => {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        setTaskObj({ ...taskObj, last_modified: dateTime })


    }
    useEffect(() => {
        setDateTime()
    }, [isUpdated])
    const handleUpdate = async () => {
        if (taskObj.taskname == "") {
            alert("Task Name should not be Nil")
        }
        else if (isUpdated == true) {

            await setDateTime()
            await updateTask(taskObj.id, taskObj).then((res) => console.log(res)).catch((err) => console.log(err))
            props.handleUpdated()
            setOpen(!open)

        }
        else {
            console.log("NO changes detected...")
        }
    }
    const handleDelete = async () => {

        await deleteTask(props.item.id).then((res) => console.log(res)).catch((err) => console.log(err))
        props.handleUpdated()
    }


    return (
        <div className="card" >
            <div className="taskname"
                onClick={handleOpen}>
                {props.item.taskname}
            </div>

            <div className="actionButton">
                <IconButton onClick={handleDelete} className="deleteButton" ><DeleteIcon></DeleteIcon></IconButton>

            </div>


            <Modal

                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="update-box">
                    <div className="update-outer-box">
                        <div className="taskname-update">
                            <label>Task Name</label>
                            <input className="taskname-text" type="text" value={taskObj.taskname} onChange={takeTaskName}></input>

                        </div>
                        <div className="priority-update">
                            <label>Priority</label>
                            <Select
                                className="priority-select"
                                id="demo-simple-select"
                                value={taskObj.priority}

                                onChange={takePriority}

                            >
                                <MenuItem value="Low">Low</MenuItem>
                                <MenuItem value="Normal">Normal</MenuItem>
                                <MenuItem value="High">High</MenuItem>
                            </Select>
                        </div>
                        <div className="status-update">
                            <label>Status</label>
                            <Select
                                className="priority-select"
                                labelId="status"
                                id="status"
                                value={taskObj.status}
                                onChange={takeStatus}
                                label="Status"

                            >
                                <MenuItem value="Not-Started">Not-Started</MenuItem>
                                <MenuItem value="In-Progress">In-Progress</MenuItem>
                                <MenuItem value="Done">Done</MenuItem>
                            </Select>
                        </div>
                        <div className="status-update">
                            <label>Last Modified</label>
                            <label>{taskObj.last_modified}</label>
                        </div>
                    </div>
                    <Button className="update-button" variant="outlined" onClick={handleUpdate} color="secondary">Update</Button>


                </Box>
            </Modal>
        </div >

    )
}
export default Task