import React from "react";
import '../tasklist/tasklist.css'
import Task from "../task/Task";

function TaskList() {
    let obj = [{ "taskname": "react", "priority": "medium", status: "is-started", lastmodified: "12-08-2022" }, { "taskname": "reactwdaaaaaaaaa", "priority": "medium", status: "is-started", lastmodified: "12-08-2022" }]

    const list = obj.map((item) => <div className="task-item" key={item.taskname.toString()}><Task item={item} /></div>)
    return (
        <div className="outerdiv">
            <label className="heading1"> Our TO DO list</label>
            <div className="column">
                <label className="taskname">Task Name</label>
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