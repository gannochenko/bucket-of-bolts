import styled, { keyframes } from 'styled-components';

export const bouncedAnimation = keyframes`
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
`;
