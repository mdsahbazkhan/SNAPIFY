import React,{useRef} from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import menu_open from "../../assets/menu_open.svg"
import menu_close from "../../assets/menu_close.svg"
import "./Header.css"

function Header() {
  const menuRef =useRef();
  const openMenu = ()=>{
    // menuRef.current.style.right="0";
    menuRef.current.classList.add('open');
  }
  const closeMenu = ()=>{
    // menuRef.current.style.right="350px";
    menuRef.current.classList.remove('open');
  }
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Post",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className=" py-2 ">
      <Container>
        <nav className=" navbar   fixed  left-8 right-8 flex items-center justify-between border border-white border-opacity-10 rounded-lg py-3 px-3 lg:max-w-screen-md mx-auto  bg-opacity-5 shadow-md backdrop-blur-lg text-white z-50 ">
          <div className="mr-3">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <img src={menu_open}onClick={openMenu} alt="" className="nav-mob-open "/>
          <ul ref={menuRef} className="flex ml-auto  nav-menu">
          <img src={menu_close} onClick={closeMenu}alt="" className="nav-mob-close  "/>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} >
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-200 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="m-0">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
