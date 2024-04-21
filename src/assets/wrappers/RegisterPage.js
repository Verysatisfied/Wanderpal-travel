import styled from "styled-components";

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  margin-bottom: 40px;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }

  .form {
    max-width: 400px;
    border-top: 5px solid #faa935;
  }
  h2 {
    color: #faa935;
    text-align: center;
    margin-bottom: 30px;
  }
  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
    transition: background-color 0.3s ease; /* Smooth transition for background color */

    &:hover {
      background-color: #e5941a; /* Darker shade for hover */
      color: white; /* Optional: change text color on hover */
    }
  }

  .member-btn {
    background: transparent;
    border: transparent;
    color: #faa935;
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
    transition: color 0.3s ease; /* Smooth transition for text color */

    &:hover {
      color: #b5651d;
    }
  }
`;
export default Wrapper;
