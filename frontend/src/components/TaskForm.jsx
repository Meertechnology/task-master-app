import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const TaskForm = () => {
  const { addTask } = useContext(TaskContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting task:', { title, description, category, dueDate });
    try {
      setLoading(true);
      await addTask({ title, description, category, dueDate });
      setTitle('');
      setDescription('');
      setCategory('');
      setDueDate('');
      setError(null);
    } catch (err) {
      console.error('Failed to add task:', err);
      setError('Error adding task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="first-title">
        <h1>Add new Task</h1>
      </div>
      <button type="button" className="icon-button">
        <FontAwesomeIcon icon={faBell} />
      </button>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <textarea
          className="form-control"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="date"
          className="form-control"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <button type="submit" className="btn-success" disabled={loading}>
        {loading ? 'Adding...' : 'Add Task'}
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default TaskForm;
