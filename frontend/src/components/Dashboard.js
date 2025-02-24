import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskList from "./TaskList";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks", {
        headers: { Authorization: token },
      });
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchTasks();
    }
  }, [token, navigate, fetchTasks]);

  const addTask = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/tasks/${editId}`, { title }, {
          headers: { Authorization: token },
        });
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/tasks", { title }, {
          headers: { Authorization: token },
        });
      }
      setTitle(""); // Reset input setelah tambah/edit task
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const startEdit = (id, currentTitle) => {
    setEditId(id);
    setTitle(currentTitle);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container">
      <h2>To-Do List</h2>
      <form onSubmit={addTask}>
        <input
          className="input-field"
          type="text"
          placeholder="New Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button className="button" type="submit">
          {editId ? "Update Task" : "Add Task"}
        </button>
      </form>
      <TaskList tasks={tasks} fetchTasks={fetchTasks} startEdit={startEdit} />
      <button className="logout-button" onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
