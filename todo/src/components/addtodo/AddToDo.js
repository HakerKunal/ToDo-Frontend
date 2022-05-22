import React, { useEffect, useState } from "react";
import { addTask } from "../../service/api";
import '../addtodo/addtodo.css'

function AddToDo(props) {
    const [task, setTask] = useState({ taskname: "", priority: "low", status: "not started", last_modified: "" })

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

    const handleSubmit = () => {
        if (task.taskname != "") {
            setDateTime()
            props.handleLoading()
            addTaskdetails()
        }
        else {
            alert("Task name should not be empty")
        }

    }





    return (
        <div className="outerbox">
            <div className="taskname1">
                <label>taskname</label>
                <input type='text' value={task.taskname} onChange={handleTaskName}></input>
            </div>
            <div className="priorit">
                <label>priority</label>
                <select name="priority" onChange={handlePriority}>
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>


                </select>

            </div>
            <div className="status">
                <label>Status</label>
                <select name="status" onChange={handleStatus}>
                    <option value="not started">Not Started</option>
                    <option value="In-Progress">In-Progress</option>
                    <option value="Done">Done</option>
                </select>

            </div>
            <button className="addButton" onClick={handleSubmit}>Save</button>

        </div>
    )
}
export default AddToDo