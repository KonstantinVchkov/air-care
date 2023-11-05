import React, { useContext, useEffect, useState } from "react";
import styles from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faLocationArrow,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { GlobalContext } from "@/context/global_context";
import PopupForm from "./PopUpForm";

const NavMenu: React.FC = () => {
  const { saveLocation,saveAddress } = useContext(GlobalContext);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [clickCounter, setClickCounter] = useState(0);

  const router = useRouter();
  const { pathname } = router;
  const getStreetAddress = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();
      const fetchedAddress = data.display_name || "Address not found";
      saveAddress(fetchedAddress)
      return fetchedAddress;
    } catch (error) {
      console.error("Error fetching address", error);
      return "Error fetching address";
    }
  };
  const updateCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = { latitude, longitude };
        saveLocation(newLocation);
        localStorage.setItem("latitude", latitude.toString());
        localStorage.setItem("longitude", longitude.toString());
        getStreetAddress(latitude, longitude);
      },
      (error) => {
        console.error("Error fetching location", error);
      }
    );
  };
  const handleButtonClick = () => {
    updateCurrentLocation();
    setClickCounter((prevCounter) => prevCounter + 1);
    if (clickCounter % 2 === 1) {
      setPopupVisible((prevVisible) => !prevVisible);
    }
  };
  const handleClosePopup = () => {
    setPopupVisible(false);
  };
  return (
    <>
      <div className={`${styles.locationArrow}`}>
        {pathname === "/" && (
          <FontAwesomeIcon
            icon={faLocationArrow}
            className={`${styles.arrowLoc}`}
            style={{ color: "#30343b" }}
          />
        )}
      </div>
      <div className={`${styles.navBar}`}>
        {pathname === "/" && isPopupVisible && (
          <PopupForm onClose={handleClosePopup}  />
        )}

        <div className={`${styles.addBtn}`} onClick={handleButtonClick}>
          <i></i>
        </div>
        <div className={`${styles.menuItem}`}>
          <ul>
            <Link href={"/"}>
              <li>
                <FontAwesomeIcon icon={faHouse} style={{ color: "#ffffff" }} />
              </li>
            </Link>
            <Link href={"/sign-in"}>
              <li>
                <FontAwesomeIcon
                  icon={faUserSecret}
                  style={{ color: "#ffffff" }}
                />
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavMenu;
