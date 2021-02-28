import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useSocket } from "../../Context/SocketContext";
import { useUI } from "../../Context/UIContext";
import ChangeUsername from "./ChangeUsername";
import SaveAccount from "./SaveAccount";
import LogOut from "./LogOut";
import DeleteUser from "./DeleteUser";

export default function OptionsMenu(props) {
  const { user, setUser, userIsTemp, setUserIsTemp } = useAuth();
  const { online } = useSocket();
  const [show, setShow] = useState(null);
  const [showOptionsMenuLabel, setShowOptionsMenuLabel] = useState(false);
  const [showOptionsMenuWindow, setShowOptionsMenuWindow] = useState(false);
  const { optsOpacity, optsEvents } = useUI();

  const toggleShowOptionsMenu = () => {
    show && setShow(null);
    setShowOptionsMenuWindow((prev) => !prev);
    setShowOptionsMenuLabel(false);
  };

  const handleOpenClose = (option) => {
    setShow((prev) => (prev === option ? null : option));
  };

  return (
    <div>
      <div
        className="options-menu"
        style={{ opacity: optsOpacity, pointerEvents: optsEvents }}
      >
        <h3 className="menu-title">Options</h3>
        {userIsTemp ? (
          <>
            <p className="options-login-info">Temporary user</p>
            <p className="options-login-info" style={{ fontSize: "1rem" }}>
              A temporary session expires when you close your web browser.
            </p>
            <SaveAccount
              values={{ userIsTemp, setUser, show, handleOpenClose }}
            />
            <ChangeUsername values={{ user, setUser, show, handleOpenClose }} />
          </>
        ) : (
          <>
            <p className="options-login-info">
              <LogOut
                values={{
                  user,
                  setUser,
                  show,
                  handleOpenClose,
                  userIsTemp,
                  setUserIsTemp,
                }}
              />
            </p>
            <ChangeUsername values={{ user, setUser, show, handleOpenClose }} />
            <SaveAccount
              values={{ userIsTemp, setUser, show, handleOpenClose }}
            />
          </>
        )}

        <DeleteUser values={{ user, setUser, show, handleOpenClose }} />

        <div className="option-div">
          <div
            className="option-label"
            onClick={() => handleOpenClose("about")}
          >
            About{" "}
            <span className="material-icons option-arrow">
              keyboard_arrow_down
            </span>
          </div>
          <div
            className={show === "about" ? "option-content" : "hidden-content"}
          >
            <div className="about-text">
              Port is a communication system currently in development.
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          showOptionsMenuWindow
            ? "dark-background"
            : "dark-background hide-dark-background"
        }
        onClick={showOptionsMenuWindow && toggleShowOptionsMenu}
      ></div>
    </div>
  );
}
