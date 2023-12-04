import { useSelector } from "react-redux";
import main from "../assets/images/landingImg.svg";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Footer } from "../components";
export const Landing = () => {
  const { user } = useSelector((store) => store.user);
  return (
    <Wrapper>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            We <span> Care</span> About You
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
            repellat delectus, error, optio officia fugiat quod nihil facilis in
            repellendus commodi reprehenderit. Quisquam voluptate, aliquam
            ducimus perspiciatis iste quam tenetur!
          </p>
          {user ? (
            <Link to="/dashboard" className="btn btn-hero">
              See you details
            </Link>
          ) : (
            <Link to="/register" className="btn btn-hero">
              Start from here
            </Link>
          )}
        </div>

        <img src={main} alt="main" className="img main-img" />
      </div>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh-var(--nav-height));
    display: grid;
    align-items: center;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primart-500);
    }
  }
  p {
    color: var(--grey-600);
  }

  .main-img {
    width: 100%; // Ensure the image takes the full width of the container
    height: auto; // Allow the height to adjust proportionally based on the image's aspect ratio
    object-fit: cover; // Use "cover" to make the image fit inside the container without distortion
    display: none;
    max-height: 75vh;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;
