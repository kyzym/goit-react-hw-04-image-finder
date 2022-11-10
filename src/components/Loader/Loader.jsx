import { ProgressBar } from 'react-loader-spinner';

import * as SC from './Loader.styled';
export const Loader = () => (
  <SC.LoaderContainer>
    <ProgressBar
      height="80"
      width="80"
      ariaLabel="progress-bar-loading"
      wrapperStyle={{}}
      wrapperClass="progress-bar-wrapper"
      borderColor="#ffa726"
      barColor="#ffa726"
    />
  </SC.LoaderContainer>
);
