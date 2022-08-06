import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { ToastContainer, ToastContainerProps } from 'react-toastify';

import Colors from 'assets/themes/Colors';

const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    background-color: transparent;
    border-radius: 5px;
  }

  .Toastify__toast-body {
    font-size: 16px;
    font-weight: 400;

    color: white;
  }

  .Toastify__toast-theme--colored.Toastify__toast--success {
    background-color: ${Colors.green.primary};
  }

  .Toastify__progress-bar--success {
    background-color: ${Colors.green.secondary};
  }

  .Toastify__toast-theme--colored.Toastify__toast--error {
    background-color: ${Colors.red.primary};
  }

  .Toastify__progress-bar--error {
    background-color: ${Colors.red.secondary};
  }
`;

const CustomToastContainer: FunctionComponent<ToastContainerProps> = () => {
  return <StyledToastContainer theme='colored' closeButton={false} />;
};

export default CustomToastContainer;
