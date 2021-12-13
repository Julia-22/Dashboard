import { useDispatch} from 'react-redux';
import './EditItem.css';
import operation from '../../redux/operation';

export default function EditItem({ item, board, handleOpenEditModal, editRef, posX, posY}) {
  const dispatch = useDispatch();

  const handleDeleteTask = event => {
    event.stopPropagation();
    dispatch(operation.deleteTask(item._id));
  }
  
  return (<>
    <div
      className="editItem_container"
      ref={editRef}
      style={{ top: posY, left: posX,}}
    >
      <button type="button" onClick={handleOpenEditModal}>Edit</button>
      <button type="button" onClick={handleDeleteTask}>Delete</button>
    </div>
  </>);
}