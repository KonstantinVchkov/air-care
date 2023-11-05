import React, { useContext } from "react";
import { GlobalContext } from "@/context/global_context";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import 'bootstrap/dist/css/bootstrap.min.css';

const CardReport = () => {
  const { reportData } = useContext(GlobalContext);



  return (
    <Container>
      <Row className="d-flex flex-column">
        {reportData?.map((myReport, index) => (
          <Col xs={12} md={8} className="mx-auto my-2" key={index}>
            <Card>
              <Card.Img variant="top" src={`${myReport.img_path}`} />
              <Card.Body>
                <Card.Title>Информации за пријавата:</Card.Title>
                <Card.Subtitle>Ул.{myReport.address}</Card.Subtitle>
                <Card.Text>
                  Загадувањето на воздухот доаѓа од: {myReport.polution_from}
                </Card.Text>
                <Card.Text>
                  Тип на категорија на загадувач: {myReport.pollutant}
                </Card.Text>
                <Card.Text>Пријавено на: {myReport.created_at}</Card.Text>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Dropdown Button
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Поднесена Пријава</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Пријавата е прифатена</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Искочен инспектор на место на настан</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CardReport;
