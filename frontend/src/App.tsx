import React, { useEffect, useState } from "react";
import { getTasks, addTask, toggleTask, deleteTask } from "./api";

interface Task {
  id: number;
  description: string;
  isCompleted: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  const handleAdd = async () => {
    if (!newTask.trim()) return;
    await addTask(newTask);
    setNewTask("");
    loadTasks();
  };

  const handleToggle = async (id: number) => {
    await toggleTask(id);
    loadTasks();
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">📝 Task Manager</h1>
      <div className="flex mb-4">
        <input
          className="border p-2 flex-grow rounded-l"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task..."
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 rounded-r"
        >
          Add
        </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center border-b py-2"
          >
            <span
              onClick={() => handleToggle(task.id)}
              className={\`cursor-pointer \${task.isCompleted ? "line-through text-gray-500" : ""}\`}
            >
              {task.description}
            </span>
            <button
              onClick={() => handleDelete(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;