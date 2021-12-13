import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import selector from '../../redux/selector';
import action from '../../redux/action';
import operation from '../../redux/operation';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import throttle from 'lodash.throttle';

import Item from "../Item/Item";
import Modal from '../Modal/Modal';
import AddTaskForm from '../AddTaskForm/AddTaskForm';

export default function Board({ board, colorIndex }) {
  const dispatch = useDispatch();
  const boards = useSelector(selector.getBoards);
  const currentBoard = useSelector(selector.getCurrentBoard);
  const currentItem = useSelector(selector.getCurrentItem);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const dragOverHandler = (event) => {
    event.preventDefault();
    if (event.target.closest('.board') &&
      event.currentTarget.dataset.boardid !== currentItem.boardId) {
      event.currentTarget.classList.add('dragOverBoard');
      [...event.currentTarget.children].forEach(el => el.style.pointerEvents = 'none');
    }
  }
  const dragLeaveHandler = (event) => {
    if (event.target.classList.contains('board')) {
      event.target.classList.remove('dragOverBoard');
    }
  }
  const dragEndHandler = (event) => {
    document.querySelectorAll('.board').forEach(el => {
      el.classList.remove('dragOverBoard');
      [...el.children].forEach(el => el.style.pointerEvents = 'auto');
    });
    
  }

  const dropCardHandler = (event, destinationBoard) => {
    event.preventDefault();

    if (destinationBoard._id === currentBoard._id) return;

    const position = (board.items.length === 0
      ? 0
      : Math.max(...board.items.map(el => el.position)) + 1);

    dispatch(operation.changeTaskBoard({
      taskId: currentItem._id,
      boardId: destinationBoard._id,
      prevBoardId: currentBoard._id,
      position
    }));
  }

  const handleOpenModal = () => {
    setIsOpenModal(true);
  }

  return (<>
    <div
      className="board"
      onDragEnd={e => dragEndHandler(e, board)}
      onDragOver={e => dragOverHandler(e, board)}
      onDrop={e => dropCardHandler(e, board)}
      onDragLeave={e => dragLeaveHandler(e, board)}
      data-boardid={board._id}
    >
      <div className={`board__border__style${colorIndex}`}></div>
      <div className="board__title">{board.title}</div>
      <div className="tasks_container">
        {board?.items?.map(item => <Item key={item._id} item={item} board={board} />)}
      </div>
      <div className="addTask" onClick={handleOpenModal}>
        <p>Add task</p>
        <AddCircleOutlineIcon className="iconAdd"/>
      </div>
    </div>
    {isOpenModal && <Modal handleClose={() => setIsOpenModal(false)}>
      <AddTaskForm item={null} board={board} handleClose={() => setIsOpenModal(false)} />
    </Modal>}
  </>);
}