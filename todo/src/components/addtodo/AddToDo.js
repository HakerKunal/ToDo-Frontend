import React, { useEffect, useState } from "react";
import { addTask } from "../../service/api";
import '../addtodo/addtodo.css'

function AddToDo(props) {
    const [task, setTask] = useState({ taskname: "", priority: "Low", status: "Not-started", last_modified: "" })

    const addTaskdetails = async () => {
        await addTask(task)
    }

    const handleTaskName = (event) => {
        setTask({ ...task, taskname: event.target.value })

    }
    const handlePriority = (event) => {
        setTask({ ...task, priority: event.target.value })

    }
    const handleStatus = (event) => {
        setTask({ ...task, status: event.target.value })
    }
    const setDateTime = async () => {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;

        setTask({ ...task, last_modified: dateTime })


    }
    useEffect(() => { setDateTime() }, [])

    const handleSubmit = async () => {
        if (task.taskname != "") {
            setDateTime()
            await addTaskdetails()
            props.handleLoading()


        }
        else {
            alert("Task name should not be empty")
        }

    }





    return (
        <div className="outerbox">
            <div className="taskname1">
                <label>Task Name</label>
                <input type='text' value={task.taskname} onChange={handleTaskName}></input>
            </div>
            <div className="priorit">
                <label>Priority</label>
                <select name="priority" onChange={handlePriority}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>


                </select>

            </div>
            <div className="status">
                <label>Status</label>
                <select name="status" onChange={handleStatus}>
                    <option value="Not-Started">Not-Started</option>
                    <option value="In-Progress">In-Progress</option>
                    <option value="Done">Done</option>
                </select>

            </div>
            <button className="addButton" onClick={handleSubmit}>Save</button>

        </div>
    )
}
export default AddToDo