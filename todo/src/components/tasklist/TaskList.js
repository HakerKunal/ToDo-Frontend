import React, { useEffect, useState } from "react";
import '../tasklist/tasklist.css'
import Task from "../task/Task";

function TaskList(props) {

    const [tasks, setTasks] = useState({ data: [], loaded: false })
    const [isUpdated, setIsUpdate] = useState(false)
    const handleUpdated = () => {
        setIsUpdate(!isUpdated)
    }
    const getData = () => {
        fetch("http://localhost:3004/tasks")
            .then((res) => res.json())
            .then((res) => {

                setTasks({ ...tasks, data: res, loaded: true })


            })
    }
    useEffect(() => {
        getData()




    }, [props.loading, isUpdated])






    const list = tasks.data.map((item) => <div className="task-item" key={item.taskname.toString()}><Task item={item} handleUpdated={handleUpdated} /></div>)
    return (
        <div className="outerdiv">
            <label className="heading1"> Our TO DO list</label>
            <div className="column">
                <label className="taskname2">Task Name</label>
                <label>Priority</label>
                <label>Status</label>
                <label>Last Modified</label>
                <label>Action</label>
            </div>
            {list}

        </div>
    )
}
export default TaskList