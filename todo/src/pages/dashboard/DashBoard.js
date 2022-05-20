import React from "react";
import SearchBar from "../../components/searchbar/SearchBar";
import AddToDo from "../../components/addtodo/AddToDo";
import TaskList from "../../components/tasklist/TaskList";

function DashBoard() {

    return (
        <div className="dashboard">
            <SearchBar />

            <AddToDo />

            <TaskList />

        </div>
    )
}
export default DashBoard