import React from 'react';
import { ColorRing } from 'react-loader-spinner';
import { ColorRingWrapper } from './Loader.styled';

export default function Loader() {
  return (
    <ColorRingWrapper>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#935be1', '#f460ca', '#6a9ef8', '#900bcd', '#361dd4']}
      />
    </ColorRingWrapper>
  );
}
