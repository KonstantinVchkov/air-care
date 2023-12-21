import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { GlobalContext } from "@/context/global_context";
import { Button } from "react-bootstrap";
import Link from "next/link";
import { IReport } from "@/types/global-types";

const AcceptConfirmation = ({ title, body, backBtn, btnMyrep }: IReport) => {
  const { isSubmitted, handleClose } = useContext(GlobalContext);
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const handleBtnClick = () => {
    handleClose();
  };
  return (
    <Modal show={isSubmitted} centered>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer className="d-flex align-center justify-content-center">
        <Link href={"/"}>
          <Button variant="secondary" onClick={handleClose}>
            {backBtn}
          </Button>
        </Link>
        {user ? (
          <Link href={"/my-reports/my-reports"}>
            <Button variant="secondary" onClick={handleBtnClick}>
              {btnMyrep}
            </Button>
          </Link>
        ) : (
          <Link href={"/anonymous-report"}>
            <Button variant="secondary" onClick={handleBtnClick}>
              {btnMyrep}
            </Button>
          </Link>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default AcceptConfirmation;
