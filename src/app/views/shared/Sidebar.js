import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavLink from "../components/NavLink";
import {
  Users
} from "@phosphor-icons/react";

const sidebarData = [
  {
    commonUrl: "/user",
    primary: {
      iconClass: <Users size={18} />,
      title: "User",
      url: "/user",
    },
  }
];

const Sidebar = () => {
  const location = useLocation();
  const [menuState, setMenuState] = useState({});
  const [bodyClass, setBodyClass] = useState("sidebar-icon-only");

  const toggleMenuState = (menuStateKey) => {
    setMenuState((prevState) => ({
      ...Object.keys(prevState).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {}),
      [menuStateKey]: !prevState[menuStateKey],
    }));
  };

  const onRouteChanged = () => {
    document.querySelector("#sidebar").classList.remove("active");
    setMenuState({});
  };

  const isPathActive = (path) => {
    return location.pathname.startsWith(path);
  };

  useEffect(() => {
    onRouteChanged();
    const body = document.querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
      el.addEventListener("mouseover", () => {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", () => {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });

    return () => {
      // Clean up event listeners if needed
    };
  }, [location]);

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        {sidebarData.map((data) => {
          return (
            <NavLink
              isPathActive={isPathActive}
              url={data.primary.url}
              iconClass={data.primary.iconClass}
              title={data.primary.title}
              commonUrl={data.commonUrl}
              child={data.secondary}
            />
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;
