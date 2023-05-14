import styled from '@emotion/styled';

export const Overlay = styled.div`
  background-color: #00000045;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;

  .modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background-color: #fff;
    width: 700px;
    height: 500px;
  }
  .modalImg {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`;
