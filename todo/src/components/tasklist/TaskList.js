import React, { useEffect, useState } from "react";
import '../tasklist/tasklist.css'
import Task from "../task/Task";

function TaskList(props) {

    const [tasks, setTasks] = useState({ data: [], loaded: false })
    const [isUpdated, setIsUpdate] = useState(false)
    const [query, setQuery] = useState("")

    const [clicked, setClicked] = useState(false)
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




    }, [tasks.data])






    const mapedData = tasks.data.filter(task => {
        if (task.taskname.toLowerCase().includes(query.toLowerCase())) {
            return task;
        }
    }).map((item) => <div className="task-item" key={item.taskname.toString()}><Task item={item} handleUpdated={handleUpdated} /></div>)
    return (
        <div className='outer-box' >
            <form className='searchinput' role="search">
                <input className='search-text' type="search" id="query" name="q"
                    placeholder="Search..."
                    aria-label="Search through site content" autoComplete="off" onChange={event => { setQuery(event.target.value) }} />

                <button onClick={(e) => { e.preventDefault();; setClicked(false) }}>Close</button>
            </form >


            <div className="outerdiv">
                <label className="heading1"> Our TO DO list</label>
                <div className="column">
                    <label className="taskname2">Task Name</label>
                    <label>Priority</label>
                    <label>Status</label>
                    <label>Last Modified</label>
                    <label>Action</label>
                </div>
                {mapedData}

            </div>
        </div>
    )
}
export default TaskList