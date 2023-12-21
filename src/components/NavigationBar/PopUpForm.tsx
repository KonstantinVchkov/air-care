import React, { useContext } from "react";
import styles from "./style.module.css"; // Напомена: Заменете го 'YourStyleName' со име на вашиот CSS модул.
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark, faXmark } from "@fortawesome/free-solid-svg-icons";
import { GlobalContext } from "@/context/global_context";

interface IPopUpForm {
  onClose: () => void;
}

const PopupForm: React.FC<IPopUpForm> = ({ onClose }) => {
  const {adress} = useContext(GlobalContext)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const latitude = localStorage.getItem("latitude");
    const longitude = localStorage.getItem("longitude");
    console.log("latitude from the popupfrm", latitude);
    if (latitude && longitude) {
      console.log(
        "Latitude from the PoPUpForm:",
        latitude,
        "Longitude from the PoPUpForm:",
        longitude
      );
    } else {
      console.log("Latitude or Longitude is not available in local storage");
    }
  };

  return (
    <div className={`${styles.popupContainer} `}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          
          <p>{adress} Дали ова е точната локација каде сакате да пријавите загадување?</p>
        </label>
        <label className={styles.label}></label>
        <Link href={"/report_form"}>
          <button className={`${styles.submitButton}`} onClick={onClose} type="submit">
            <p className="mb-0">Потврди</p>
          </button>
        </Link>
        <FontAwesomeIcon
          icon={faXmark}
          size="2xl"
          style={{ color: "#ffffff", padding: "2px" }}
        />
        <button
          type="button"
          onClick={onClose}
          className={styles.closeButton}
        ></button>
      </form>
    </div>
  );
};

export default PopupForm;
