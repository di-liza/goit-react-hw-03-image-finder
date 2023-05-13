import React from 'react';
import { Overlay } from './Modal.styled';

export default function Modal() {
  return (
    <Overlay>
      <div className="modal"></div>
    </Overlay>
  );
}
