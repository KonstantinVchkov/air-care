import { IReportForm } from "@/types/global-types";
// import type { NextPage } from "next";
import React, { useContext, useState } from "react";
import style from "./style.module.css";
import { faHouse, faIndustry, faSmog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Camera from "../camera/camera";
import axios from "axios";
import { GlobalContext, IReportData } from "@/context/global_context";
import AcceptConfirmation from "../Report-confirmation/Report-Accept-Confirmation";
import { v4 as uuidv4 } from "uuid";
import ReportDiscard from "../Report-confirmation/Report-Discard";
// import { useReportContext } from "@/context/context_report_form";

const ReportFormComponent: React.FC<IReportForm> = ({
  img,
  title,
  paragraph_first,
  paragraph_second,
  paragraph_third,
  onSubmit,
}) => {
  const [selectedSource, setSelectedSource] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const { submitReport, adress } = useContext(GlobalContext);
  const [reportId, setReportId] = useState<string>("");
  const subcategories = {
    фабрика: ["Чад", "Миризба", "Друго"],
    Домакинство: ["Чад", "Миризба", "Друго"],
  };
  const newReportId = uuidv4();
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const handleShowDiscardModal = () => {
    setShowDiscardModal(true);
  };
  const handleConfirmDiscard = () => {
    setShowDiscardModal(false);
    resetForm();
  };
  const handleOpenCamera = () => {
    setIsCameraOpen(true);
  };

  const handleCloseCamera = (e: React.FormEvent) => {
    e.stopPropagation();
    setIsCameraOpen(false);
  };
  const resetForm = () => {
    setSelectedSource("");
    setSelectedSubcategory("");
    setCapturedImage(null);
    localStorage.removeItem("latitude");
    localStorage.removeItem("longitude");
  };
  const handleSubmit = async () => {
    try {
      const latitude = localStorage.getItem("latitude");
      const longitude = localStorage.getItem("longitude");

      if (!latitude || !longitude) {
        return;
      }

      const data = {
        id: newReportId,
        latitude,
        longitude,
        adress,
        level: "",
        img_path: capturedImage || "",
        status: "",
        description: "",
        polution_type: "",
        polution_from: selectedSource,
        pollutant: selectedSubcategory,
        created_at: new Date().toString(),
      };
      submitReport(data);

      await axios.post(
        "https://nikola-cucukovski.sharedwithexpose.com/aircare/air-care/backend/form_report.php",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Failed to submit report:", error);
    }
  };
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const renderSubcategories = () => {
    if (selectedSource === "фабрика" || selectedSource === "Домакинство") {
      return (
        <div className="subcategory-selection row flex-nowrap justify-content-center mb-3">
          {subcategories[selectedSource].map((subcategory, index) => (
            <button
              key={index}
              type="button"
              className="btn btn-outline-secondary p-3 col-lg-3 m-1"
              onClick={() => setSelectedSubcategory(subcategory)}
            >
              {subcategory}
            </button>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`${style.reportForm} container mt-5`}>
      <h2 className="text-center mb-4">{title}</h2>
      <form>
        <div className="source-selection row flex-nowrap justify-content-center  mb-3">
          <div
            className="btn btn-outline-success p-3 col-lg-3 m-1"
            onClick={() => setSelectedSource("фабрика")}
          >
            <FontAwesomeIcon icon={faIndustry} style={{ color: "#d5d6d8" }} />
            <span>{paragraph_first}</span>
          </div>
          <div
            className="btn btn-outline-success p-3 col-lg-3 m-1"
            onClick={() => setSelectedSource("Домакинство")}
          >
            <FontAwesomeIcon icon={faHouse} style={{ color: "#cacdd3" }} />
            <span>{paragraph_second}</span>
          </div>
          <div
            className="btn btn-outline-success p-3 col-lg-3 m-1"
            onClick={() => setSelectedSource("Друго")}
          >
            <FontAwesomeIcon icon={faSmog} style={{ color: "#cdd0d6" }} />
            <span>{paragraph_third}</span>
          </div>
        </div>
        {renderSubcategories()}
        <div className="photo-upload mb-3">
          <div
            className={`d-flex flex-column mb-2 ${style.cameraImg}`}
            onClick={handleOpenCamera}
          >
            <img src="/images/camera.png" alt="" />
            Прикачи Фотографија (Задолжително)
            <Camera
              isOpen={isCameraOpen}
              onClose={handleCloseCamera}
              onCapture={(imageData) => setCapturedImage(imageData)}
            />
          </div>
        </div>
        <div className="buttons d-flex">
          <span
            className=" w-50"
            onClick={() => {
              handleShowDiscardModal();
            }}
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1"
                y="1"
                width="62"
                height="62"
                rx="14"
                stroke="#343A40"
                strokeWidth="2"
              />
              <path
                d="M40.4714 39.7874C40.5525 39.8667 40.6168 39.9608 40.6607 40.0644C40.7045 40.168 40.7271 40.279 40.7271 40.3911C40.7271 40.5032 40.7045 40.6143 40.6607 40.7178C40.6168 40.8214 40.5525 40.9155 40.4714 40.9948C40.3903 41.0741 40.294 41.137 40.1881 41.1799C40.0822 41.2228 39.9686 41.2449 39.854 41.2449C39.7393 41.2449 39.6258 41.2228 39.5198 41.1799C39.4139 41.137 39.3176 41.0741 39.2365 40.9948L31.9999 33.9179L24.7632 40.9948C24.5994 41.1549 24.3773 41.2449 24.1457 41.2449C23.9142 41.2449 23.6921 41.1549 23.5283 40.9948C23.3646 40.8347 23.2726 40.6176 23.2726 40.3911C23.2726 40.1647 23.3646 39.9475 23.5283 39.7874L30.7661 32.7116L23.5283 25.6357C23.3646 25.4756 23.2726 25.2584 23.2726 25.032C23.2726 24.8056 23.3646 24.5884 23.5283 24.4283C23.6921 24.2682 23.9142 24.1782 24.1457 24.1782C24.3773 24.1782 24.5994 24.2682 24.7632 24.4283L31.9999 31.5052L39.2365 24.4283C39.4003 24.2682 39.6224 24.1782 39.854 24.1782C40.0855 24.1782 40.3076 24.2682 40.4714 24.4283C40.6351 24.5884 40.7271 24.8056 40.7271 25.032C40.7271 25.2584 40.6351 25.4756 40.4714 25.6357L33.2336 32.7116L40.4714 39.7874Z"
                fill="#343A40"
              />
            </svg>
          </span>
          <button
            type="button"
            className="btn btn-success w-100"
            onClick={handleSubmit}
          >
            Пријави
          </button>
        </div>
      </form>
      <ReportDiscard
        show={showDiscardModal}
        onHide={() => setShowDiscardModal(false)}
        onConfirm={handleConfirmDiscard}
      />
      
      <AcceptConfirmation
        title={"Вашата пријава е успешно испратена."}
        body={
          "Следете го разрешувањето на пријавениот случај преку вашата емаил адреса"
        }
        backBtn={"Назад"}
        btnMyrep={user ? "Мои Пријави" : "Потврди"}
      />
    </div>
  );
};

export default ReportFormComponent;
