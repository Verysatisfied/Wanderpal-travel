import styled from "styled-components";

const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* Change to two columns */
    column-gap: 1rem;
  }
`;
export default Wrapper;
