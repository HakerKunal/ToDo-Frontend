import { FormControlUnstyledContext } from "@mui/base";
import React from "react";

function Sort() {
  let tasks = [
    {
      taskname: "washing  ",
      priority: "Medium",
      status: "Done",
      last_modified: "2022-5-24 11:0:36",
      id: 4,
    },
    {
      taskname: "Bathing",
      priority: "Low",
      status: "In-Progress",
      last_modified: "2022-5-24 11:5:43",
      id: 6,
    },
    {
      taskname: "panipuri nnew",
      priority: "High",
      status: "Done",
      last_modified: "2022-5-24 10:49:33",
      id: 10,
    },
    {
      id: 13,
      taskname: "party",
      priority: "High",
      status: "Not-Started",
      last_modified: "2022-5-23 0:11:5",
    },
    {
      id: 14,
      taskname: "React work",
      priority: "Low",
      status: "Done",
      last_modified: "2022-5-23 11:23:55",
    },
    {
      taskname: "horse riding",
      priority: "Medium",
      status: "In-Progress",
      last_modified: "2022-5-23 23:53:12",
      id: 15,
    },
    {
      taskname: "carrtoon newe",
      priority: "Low",
      status: "Not-Started",
      last_modified: "2022-5-24 11:3:5",
      id: 17,
    },
    {
      taskname: "paratha",
      priority: "Medium",
      status: "Done",
      last_modified: "2022-5-24 11:19:41",
      id: 18,
    },
  ];
  const sortingFunc = async () => {
    tasks.forEach((v) => {
      if (v.status == "Done") {
        v.status = 3;
      } else if (v.status == "In-Progress") {
        v.status = 2;
      } else if (v.status == "Not-Started") {
        v.status = 1;
      }
    });
    // console.log(tasks);
    tasks
      .sort((a, b) => a.status - b.status)
      .forEach((v) => {
        if (v.status == 3) {
          v.status = "Done";
        } else if (v.status == 2) {
          v.status = "In-Progress";
        } else if (v.status == 1) {
          v.status = "Not-started";
        }
      });

    console.log(tasks);
  };

  //   let sort = tasks.sort((a, b) => b.last_modified - a.last_modified);
  //   console.log(sort);
  return (
    <div>
      sort
      <button onClick={sortingFunc}>cli</button>
    </div>
  );
}
export default Sort;
