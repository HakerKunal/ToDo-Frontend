import React, { useEffect, useState } from "react";
import TaskList from "../../components/tasklist/TaskList";

function DashBoard(props) {
  const [loading, setLoading] = useState(false);
  const handleLoading = () => {
    setLoading(!loading);
  };

  return (
    <div className="dashboard">
      <TaskList loading={loading} />
    </div>
  );
}
export default DashBoard;
