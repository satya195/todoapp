import React, { useState } from 'react';
import './TodoApp.css';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  isEditing: boolean;
}

const ToDoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [editingTaskText, setEditingTaskText] = useState<string>('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([
        ...tasks,
        { id: Date.now(), text: newTask.trim(), completed: false, isEditing: false }
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

  const startEditing = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: true } : { ...task, isEditing: false }
      )
    );
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setEditingTaskText(taskToEdit.text);
    }
  };

  const saveEditing = (id: number) => {
    if (editingTaskText.trim() !== '') {
      setTasks(
        tasks.map((task) =>
          task.id === id
            ? { ...task, text: editingTaskText.trim(), isEditing: false }
            : task
        )
      );
      setEditingTaskText('');
    }
  };

  const cancelEditing = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: false } : task
      )
    );
    setEditingTaskText('');
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

      <div className="list-container">
        <ul className="list-group">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'bg-secondary text-light' : ''}`}
            >
              {task.isEditing ? (
                <div className="d-flex align-items-center w-100">
                  <input
                    type="text"
                    className="form-control me-2"
                    value={editingTaskText}
                    onChange={(e) => setEditingTaskText(e.target.value)}
                  />
                  <button className="btn btn-primary btn-sm me-2" onClick={() => saveEditing(task.id)}>
                    Save
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => cancelEditing(task.id)}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="d-flex align-items-center w-100">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                  />
                  <span
                    className="task-name flex-grow-1"
                    style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                  >
                    {task.text}
                  </span>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => startEditing(task.id)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteTask(task.id)}
                  >
                    🗑️
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoApp;
