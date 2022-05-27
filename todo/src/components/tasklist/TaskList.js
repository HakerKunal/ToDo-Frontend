import React, { useEffect, useState } from "react";
import "../tasklist/tasklist.css";
import Task from "../task/Task";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

function TaskList(props) {
  const [tasks, setTasks] = useState({ data: [], loaded: false });
  const [isUpdated, setIsUpdate] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [sortby, setSOrtBy] = useState("");
  const [query, setQuery] = useState("");
  const [noOfPages, setNoOfPages] = useState(0);
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 10;

  const handleUpdated = () => {
    setIsUpdate(!isUpdated);
  };
  const getData = () => {
    fetch("http://localhost:3004/tasks")
      .then((res) => res.json())
      .then((res) => {
        setTasks({ ...tasks, data: res, loaded: true });
      });
    setNoOfPages(Math.ceil(tasks.data.length / 10));
  };

  useEffect(() => {
    getData();
  }, [tasks.loaded, sorted, isUpdated]);

  const mapFunc = () => {
    if (sorted === true) {
      let sortedData = sortingFunc();
    }
    let mapedData = tasks.data
      .filter((task) => {
        if (task.taskname.toLowerCase().includes(query.toLowerCase())) {
          return task;
        }
      })
      .map((item, key) => (
        <Task
          item={item}
          handleUpdated={handleUpdated}
          key={item.id}
          className="task-item"
        />
      ));
    return mapedData;
  };
  const toggleSort = () => {
    setSorted((prevstate) => !prevstate);
    return;
  };

  const sortingFunc = async () => {
    if (sortby === "status") {
      tasks.data.forEach((v) => {
        if (v.status === "Done") {
          v.status = 3;
        } else if (v.status === "In-Progress") {
          v.status = 2;
        } else if (v.status === "Not-Started") {
          v.status = 1;
        }
      });
      tasks.data
        .sort((a, b) => a.status - b.status)
        .forEach((v) => {
          if (v.status === 3) {
            v.status = "Done";
          } else if (v.status === 2) {
            v.status = "In-Progress";
          } else if (v.status === 1) {
            v.status = "Not-started";
          }
        });
    } else if (sortby === "priority") {
      tasks.data.forEach((v) => {
        if (v.priority === "High") {
          v.priority = 3;
        } else if (v.priority === "Medium") {
          v.priority = 2;
        } else if (v.priority === "Low") {
          v.priority = 1;
        }
      });
      tasks.data
        .sort((a, b) => b.priority - a.priority)
        .forEach((v) => {
          if (v.priority === 3) {
            v.priority = "High";
          } else if (v.priority === 2) {
            v.priority = "Medium";
          } else if (v.priority === 1) {
            v.priority = "low";
          }
        });
    } else if (sortby === "taskname") {
      tasks.data.sort((a, b) => a.taskname.localeCompare(b.taskname));
    } else if (sortby === "date") {
      tasks.data.sort((a, b) => b.last_modified.localeCompare(a.last_modified));
    }
  };
  const changeSortByStatus = () => {
    setSOrtBy("status");
  };
  const changeSortByToPriority = () => {
    setSOrtBy("priority");
  };
  const changeSortByToTaskname = () => {
    setSOrtBy("taskname");
  };
  const changeSortByToDate = () => {
    setSOrtBy("date");
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="outer-box">
      <form className="searchinput" role="search">
        <input
          className="search-text"
          type="search"
          id="query"
          name="q"
          placeholder="Search..."
          aria-label="Search through site content"
          autoComplete="off"
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />

        <button
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Close
        </button>
      </form>

      <Link to="/">
        <button className="button-37" role="button">
          Add To Do
        </button>
      </Link>

      <div className="outerdiv">
        <label className="heading1"> Our TO DO list</label>
        <div className="column">
          <label
            className="taskname2"
            onClick={() => {
              mapFunc();
              toggleSort();
              changeSortByToTaskname();
            }}
          >
            Task Name
          </label>
          <label
            className="labelitem"
            onClick={() => {
              mapFunc();
              toggleSort();
              changeSortByToPriority();
            }}
          >
            Priority
          </label>
          <label
            className="labelitem"
            onClick={() => {
              mapFunc();
              toggleSort();
              changeSortByStatus();
            }}
          >
            Status
          </label>
          <label
            className="labelitem"
            onClick={() => {
              mapFunc();
              toggleSort();
              changeSortByToDate();
            }}
          >
            Last Modified
          </label>
          <label>Action</label>
        </div>
        {mapFunc().slice((page - 1) * itemsPerPage, page * itemsPerPage)}
        <Pagination
          className="pagination"
          count={noOfPages}
          page={page}
          onChange={handlePageChange}
          defaultPage={1}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
}
export default TaskList;
