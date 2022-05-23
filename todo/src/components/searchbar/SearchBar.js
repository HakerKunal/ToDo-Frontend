import React, { useState, useEffect } from 'react'
import UpdatePopUp from '../updatepopup/UpdatePopUp';
import '../searchbar/searchbar.css';
import TaskItem from './TaskItem';
import Task from '../task/Task';



function SearchBar(props) {
    const [query, setQuery] = useState("")

    const [clicked, setClicked] = useState(false)
    const [tasks, setTasks] = useState({ data: [], loaded: false })
    const getData = () => {
        fetch("http://localhost:3004/tasks")
            .then((res) => res.json())
            .then((res) => {

                setTasks({ ...tasks, data: res, loaded: true })


            })
    }
    useEffect(() => {
        getData()
    }, [props.handleLoading])

    const mapedData = tasks.data.filter(task => {
        if (task.taskname.toLowerCase().includes(query.toLowerCase())) {
            return task;
        }
    }).map((task, index) => (
        <div key={index} >
            <TaskItem item={task} handleUpdated={props.handleLoading} className="taskItem" /></div>


    ))

    const toogleClick = () => {

        setClicked(!clicked)
    }



    return (
        <div className='outer-box' >
            <form className='searchinput' role="search">
                <input className='search-text' type="search" id="query" name="q"
                    placeholder="Search..."
                    aria-label="Search through site content" autocomplete="off" onChange={event => { setQuery(event.target.value) }} onClick={toogleClick} />
                {clicked ? <div className='dataResult' >
                    {mapedData}</div> : <div />}
                <button onClick={(e) => { e.preventDefault();; setClicked(false) }}>Close</button>
            </form >

        </div >
    )
}
export default SearchBar
