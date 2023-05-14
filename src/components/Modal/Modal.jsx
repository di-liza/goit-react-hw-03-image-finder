import React, { Component } from 'react';
import { Backdrop } from './Modal.styled';

import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal');

// export default function Modal({ activeCard }) {
//   console.log(activeCard);
//   return (
//     <Overlay>
//       <div className="modal">
//         <img
//           src={activeCard.largeImageURL}
//           alt={activeCard.tags}
//           className="modalImg"
//         />
//       </div>
//     </Overlay>
//   );
// }
export default class Modal extends Component {
  // Закрытие модалки по клику на Escape
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  // Закрытие модалки по клику на Backdrop
  handleBackdropClose = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };
  // Рендер
  render() {
    return createPortal(
      <Backdrop onClick={this.handleBackdropClose}>
        <div className="modal">
          <img
            src={this.props.activeCard.largeImageURL}
            alt={this.props.activeCard.tags}
            className="modalImg"
          />
        </div>
      </Backdrop>,
      modalRoot
    );
  }
}
