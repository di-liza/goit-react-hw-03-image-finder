import styled from '@emotion/styled';

export const LoadMoreBtn = styled.button`
  margin: 20px auto;
  width: 150px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 20px;
  text-decoration: none;
  font-family: sans-serif;
  border: none;
  background: linear-gradient(45deg, #140462, #fc56e0, #750b9d);
  background-size: 400%;
  border-radius: 30px;
  transform: translate(0%, -50%);

  :hover {
    animation: animate 8s linear infinite;
  }
  @keyframes animate {
    0% {
      background-position: 0%;
    }
    100% {
      background-position: 400%;
    }
  }
  :before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    z-index: -1;
    background: linear-gradient(45deg, #f15523, #ef3224, #7c3697);
    background-size: 400%;
    border-radius: 40px;
    opacity: 0;
    transition: 0.5s;
  }
  :hover:before {
    filter: blur(20px);
    opacity: 1;
    animation: animate 8s linear infinite;
  }
`;
