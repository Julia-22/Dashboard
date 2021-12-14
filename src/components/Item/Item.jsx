import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import selector from '../../redux/selector';
import action from '../../redux/action';
import operation from '../../redux/operation';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Modal from '../Modal/Modal';
import DetailsTask from '../DetailsTask/DetailsTask';
import './Item.css';
import EditItem from '../EditItem/EditItem';
import useClickOutside from '../UseClickOutside';
import AddTaskForm from '../AddTaskForm/AddTaskForm';

export default function Item({ item, board }) {
  const dispatch = useDispatch();
  const currentItem = useSelector(selector.getCurrentItem);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenEditPanel, setIsOpenEditPanel] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const editRef = useRef(null);
  const editButtonRef = useRef(null);

  useClickOutside(editRef, () => setIsOpenEditPanel(false), "editButton");

  const dragOverHandler = (event) => {
    event.preventDefault();
    if (event.target.closest('.item') &&
      currentItem.boardId === event.currentTarget.parentElement.parentElement.dataset.boardid) {
      event.currentTarget.classList.add('dragOver');
      [...event.currentTarget.children].forEach(el => el.style.pointerEvents = 'none');
    }
  }

  const dragLeaveHandler = event => {
    if (event.target.classList.contains('item')) {
      event.target.classList.remove('dragOver');
    }
  }

  const dragStartHandler = (event, board, item) => {
    dispatch(action.setCurrentBoard(board));
    dispatch(action.setCurrentItem(item));
    document.querySelectorAll('.board').forEach(el => el.classList.add('drag'));
    document.querySelectorAll('.item').forEach(el => el.classList.add('notDraggable'));
    event.target.classList.remove('notDraggable');
  }

  const dragEndHandler = event => {
    event.target.style.boxShadow = 'none';
    event.target.classList.remove('draggable');
    document.querySelectorAll('.board').forEach(el => el.classList.remove('drag'));
    document.querySelectorAll('.item').forEach(el => {
      el.classList.remove('notDraggable');
      el.classList.remove('dragOver');
      [...el.children].forEach(el => el.style.pointerEvents = 'auto');
    });
  }

  const dropHandler = (event, destinationBoard, item) => {
    event.preventDefault();
    if (destinationBoard._id !== board._id) {
      return;
    }
    dispatch(operation.changePosition(currentItem._id ,{
      boardId: destinationBoard._id,
      position: item.position,
    }))
  }

  const handleOpenModal = () => {
    setIsOpenModal(true);
  }

  const handleOpenEditPanel = event => {
    event.stopPropagation();
    setIsOpenEditPanel(!isOpenEditPanel);
  }

  const handleOpenEditModal = event => {
    event.stopPropagation();
    setIsOpenEditModal(true);
  }

  const posX = editButtonRef.current?.getBoundingClientRect()?.x-100;
  const posY = editButtonRef.current?.getBoundingClientRect()?.y+25;

  return (<>
    <div
      className="item"
      draggable={true}
      onDragOver={e => dragOverHandler(e)}
      onDragLeave={e => dragLeaveHandler(e)}
      onDragStart={e => dragStartHandler(e, board, item)}
      onDragEnd={e => dragEndHandler(e)}
      onDrop={e => dropHandler(e, board, item)}
      onClick={handleOpenModal}
      data-itemid={item._id}
    >
      <div className={`item__priority ${item.priority.split(' ')[0]}`}>{item.priority}</div>
      <p>{item.title}</p>

      <div className="editButton" ref={editButtonRef}>
        <div onClick={handleOpenEditPanel}><MoreVertIcon style={{ color: "rgb(160, 158, 158)" }} /></div>
        {isOpenEditPanel && <EditItem posX={posX} posY={posY} editRef={editRef} setIsOpenEdit={setIsOpenEditPanel} item={item} board={board} handleOpenEditModal={handleOpenEditModal}/>}
      </div>
    </div>
    {isOpenModal && <Modal handleClose={() => setIsOpenModal(false)}><DetailsTask task={item} /></Modal>}
    
    {isOpenEditModal && <Modal handleClose={() => setIsOpenEditModal(false)}>
      <AddTaskForm item={item} board={board} handleClose={() => setIsOpenEditModal(false)}  />
    </Modal>}
  </>);
}