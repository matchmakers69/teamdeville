import styled from 'styled-components';

export default styled.div`
  position: relative;
  min-height: 46rem;
  height: 50vh;
  overflow: hidden;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  @media (max-width: 992px) {
    height: 30vh;
    min-height: 30rem;
  }
`;
