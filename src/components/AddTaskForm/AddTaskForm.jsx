import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AddTaskForm.css';
import operation from '../../redux/operation';

export default function AddTaskForm({ board, handleClose, item }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [errorTitle, setErrorTitle] = useState(null);
  const [errorDescription, setErrorDescription] = useState(null);
  const [errorSelect, setErrorSelect] = useState(null);

  const titleInput = useRef(null);
  const descInput = useRef(null);
  
  const handleChangeTitle = event => {
    setErrorTitle(event.target.value === '');
    setTitle(event.target.value);
  }

  const handleChangeDescription = event => {
    setErrorDescription(event.target.value === '');
    setDescription(event.target.value);
  }

  const handleSave = event => {
    event.preventDefault();
    if (item) {
      const task = {
        title: title || item.title,
        description: description || item.description,
        priority: priority || item.priority
      }

      dispatch(operation.editTask(task, item._id));
      handleClose();
      return;
    }

    const task = {
      title,
      description,
      priority,
      boardId: board._id,
      position: board.items.length,
    }

    if (!description) {
      setErrorDescription(true);
      descInput.current.focus();
    }
    if (!title) {
      setErrorTitle(true);
      titleInput.current.focus();
    };
    
    if (!priority) setErrorSelect(true);

    if (!title || !description || !priority) {
      return;
    }

    dispatch(operation.addTask(task));

    handleClose();
  }

  const handleSelect = event => {
    setErrorSelect(event.target.value === null);
    let title = null;
    switch (event.target.value) {
      case 'Low Priority': title = 'Low Priority';
        break;
      case 'Med Priority': title = 'Med Priority';
        break;
      case 'High Priority': title = 'High Priority';
        break;
      default: title = "Low Priority";
    }
    if (item) {
      setPriority(title);
    } else {
      setPriority(title);
    }
  }

  return (
    <div className="addTask_modal">
      <div className="style_container"></div>
      <div className="title_container">
        <p>Add new task</p>
      </div>

      <form className="addTaskForm" onSubmit={handleSave}>
        <label><p>Title</p>
          <input
            ref={titleInput}
            type="text"
            name="title"
            placeholder="This is a title"
            value={title ? title : item?.title}
            onChange={handleChangeTitle}/>
          {errorTitle && <div className="required">required</div>}
        </label>

        <label><p>Description</p>
          <textarea
            ref={descInput}
            name="description"
            value={description ? description : item?.description}
            onChange={handleChangeDescription} />
          {errorDescription && <div className="required">required</div>}
        </label>

        <label><p>Priority</p>
          <select onChange={handleSelect}>
            {!item && <option disabled selected={!item}>Priority</option>}
            <option value="Low Priority" selected={item?.priority==="Low Priority"}>Low</option>
            <option value="Med Priority" selected={item?.priority==="Med Priority"}>Medium</option>
            <option value="High Priority" selected={item?.priority==="High Priority"}>High</option>
          </select>
          {errorSelect && <div className="required">required</div>}
        </label>

        <div className="buttons_container">
          <button type="button" className="button_cancel" onClick={handleClose}>Cancel</button>
          {item === null &&
            <button
              type="submit"
              className="button_save"
              disabled={!priority && !title && !description}>
              Save
            </button>
          }
          {item &&
            <button
              type="submit"
              className="button_save">
              Edit
            </button>
          }
        </div>
      </form>
    </div>
  );
}