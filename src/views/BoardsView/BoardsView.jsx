import Board from '../../components/Board/Board';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import selector from '../../redux/selector';
import operation from '../../redux/operation';
import authOperation from '../../redux/authorization/operation';
import '../auth.css';
import Loader from '../../components/Loader/Loader';
import authSelector from '../../redux/authorization/selector';

export default function BoardsView() {
  const dispatch = useDispatch();
  const boards = useSelector(selector.getBoards);
  const isLoading = useSelector(selector.isLoading);
  const userEmail = localStorage.getItem('email');

  useEffect(() => {
    dispatch(operation.getBoadrs());
  }, []);

  const handleLogout = () => {
    dispatch(authOperation.logout());
  }

  return (
    <div className="boardsView">
      
      <div className="header">
        <p>{userEmail}</p>
        <button
          className="logoutButton"
          type='button'
          onClick={handleLogout}
          >Log out
        </button>
      </div>

      <div className="boards_container">
        {!isLoading && boards.map((board, i) => <Board key={board._id} board={board} colorIndex={i}/>)}
      </div>

      {isLoading && <Loader/>}
    </div>
  );
}