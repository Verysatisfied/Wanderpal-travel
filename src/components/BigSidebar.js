import NavLinks from "./NavLinks";
import Wrapper from "../assets/wrappers/BigSidebar";

const BigSidebar = () => {
  return (
    <Wrapper>
      <div className="sidebar-container show-sidebar">
        <div className="content">
          <header></header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
