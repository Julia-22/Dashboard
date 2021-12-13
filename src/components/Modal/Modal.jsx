import './Modal.css';
import useOnClickOutside from '../UseClickOutside';
import useKeyEffect from '../UseKeyEffect';
import { useEffect, useRef } from 'react';

export default function Modal({ children, handleClose }) {
  const modalRef = useRef(null);
  useOnClickOutside(modalRef, handleClose);
  useKeyEffect('Escape', handleClose);

  return (
    <div className="overlay">
      <div className="modal" ref={modalRef}>
        <button type="button" className="close-btn" onClick={handleClose}>X</button>
        {children}
      </div>
    </div>
  );
}