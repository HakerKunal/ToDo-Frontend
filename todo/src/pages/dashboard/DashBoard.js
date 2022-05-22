import React, { useEffect, useState } from "react";
import SearchBar from "../../components/searchbar/SearchBar";
import AddToDo from "../../components/addtodo/AddToDo";
import TaskList from "../../components/tasklist/TaskList";

function DashBoard(props) {
    const [loading, setLoading] = useState(false)
    const handleLoading = () => {
        setLoading(!loading)

    }



    return (
        <div className="dashboard">
            <SearchBar />

            <AddToDo handleLoading={handleLoading} />

            <TaskList loading={loading} />

        </div>
    )
}
export default DashBoard