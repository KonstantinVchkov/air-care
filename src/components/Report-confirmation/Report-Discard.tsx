import React from "react";
import { Button, Modal } from "react-bootstrap";
import style from "./style.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
interface IRDiscard {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
}
const ReportDiscard = ({ show, onHide, onConfirm }: IRDiscard) => {
  return (
    <div className={`${style.reportDiscard}`}>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Title className="d-flex justify-content-center">
            <img src="/images/icon_warning.png" alt="" />
        </Modal.Title>

        <Modal.Header>
          <Modal.Title>
            Дали сте сигурни дека сакате да ја поништите пријавата?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Доколку ја откажете пријавата внесените податоци нема да бидат
          прикажани.
        </Modal.Body>
        <Modal.Footer className="d-flex align-center w-100 justify-content-center">
          {/* <Link href={"/"}> */}
          <Button variant="secondary"  className="w-40" onClick={onHide}>
            Не Сакам
          </Button>
          {/* </Link> */}
          {/* <Link href={"/my-reports/my-reports"}> */}
          <Button variant="danger" className="w-40" onClick={onConfirm}>
            Сакам
          </Button>
          {/* </Link> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReportDiscard;
