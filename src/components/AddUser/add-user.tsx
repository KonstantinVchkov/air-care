import React from "react";
import styles from "./styles.module.css";
const AddUser = () => {
  return (
    <div className={`${styles.AddUser}`}>
      <header>
        <nav className="navbar navbar-expand-lg bg-color-style-nav">
          <div className="container-fluid justify-content-between">
            <div className="collapse navbar-collapse justify-content-center">
              <div className="navbar-nav w-25 justify-content-center align-items-center p-0">
                <a className="nav-link p-0 w-25" href="#">
                  <img
                    className="w-100"
                    src="./BREATHE.MK HACKATHON/viber_image_2023-10-22_18-08-15-736 2.jpg"
                    alt=""
                  />
                </a>
              </div>
              <div className="navbar-nav w-50 justify-content-between align-items-center py-3">
                <a
                  id="search-instructors-button"
                  className="nav-link btn bg-color-secondary"
                  // style="color: #ffffff"
                  href="#"
                >
                  Инспектори
                </a>
                <a
                  id="add-inspector-button"
                  className="nav-link btn bg-color-secondary"
                  // style="color: #ffffff"
                  href="#"
                >
                  Додај Корисник
                </a>
                <a
                  className="nav-link btn bg-color-secondary"
                  // style="color: #ffffff"
                  href="#"
                >
                  Календар
                </a>
                <a
                  className="nav-link btn bg-color-secondary"
                  // style="color: #ffffff"
                  href="#"
                >
                  Мапа
                </a>
              </div>
              <div className="navbar-nav justify-content-end w-25 align-items-center">
                <a className="nav-link mx-2" href="#">
                  {/* <i className="fa-solid fa-bell" style="color: #ffffff"></i> */}
                </a>
                <a className="nav-link mx-2" href="#">
                  {/* <i className="fa-solid fa-gear" style="color: #ffffff"></i> */}
                </a>
                <a className="nav-link mx-2" href="#">
                  <img
                    className="rounded-circle w-50"
                    src="https://picsum.photos/100/100"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default AddUser;
