import React, { useState } from 'react';
import './TodoApp.css';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const ToDoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([
        ...tasks,
        { id: Date.now(), text: newTask.trim(), completed: false },
      ]);
      setNewTask('');
    }
  };

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="todo-app-container d-flex flex-column align-items-center py-5">
      <h1 className="app-heading mb-4">TODO APP</h1>

      <div className="input-group mb-4 w-50">
        <input
          type="text"
          className="form-control"
          maxLength={55}
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="btn btn-success" onClick={addTask}>
          ADD
        </button>
      </div>

      {/* Scrollable List Area */}
      <div className="list-container">
        <ul className="list-group">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'bg-secondary text-light' : ''}`}
            >
              <div className="d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />
                <span className='task-name' style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.text}
                </span>
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteTask(task.id)}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoApp;
