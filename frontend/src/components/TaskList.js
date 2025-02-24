import axios from "axios";

const TaskList = ({ tasks, fetchTasks, startEdit }) => {
  const token = localStorage.getItem("token");

  const toggleComplete = async (id, completed) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, { completed: !completed }, {
        headers: { Authorization: token },
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`, {
        headers: { Authorization: token },
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
          {task.title}
          <div className="button-container-1">
            <button className="edit-button-1" onClick={() => startEdit(task.id, task.title)}>Edit</button>
            <button className="delete-button-1" onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
