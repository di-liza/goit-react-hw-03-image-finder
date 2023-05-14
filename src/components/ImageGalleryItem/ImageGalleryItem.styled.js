import styled from '@emotion/styled';

export const Item = styled.li`
  height: 400px;
  background-color: #1a1a1a;
  border: 2px solid #6f76c7;
  border-radius: 4px;
  flex-direction: column;
  display: flex;
  position: relative;
  overflow: hidden;

  .imgLink {
    height: 100%;
    text-align: center;
    display: block;
  }
  .itemImg {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`;
