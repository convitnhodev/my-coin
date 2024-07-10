import React from "react";
import { Col, Row, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Step3WellDone: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <h3>STEP 3:</h3>
      <h3
        style={{
          color: "black",
          fontSize: 25,
        }}
      >
        You are done!
      </h3>
      <Row>
        <Col span={12}>
          <h4
            style={{
              fontWeight: "normal",
              textAlign: "justify",
              margin: "0 0 16px 0",
              lineHeight: "1.5",
              marginTop: "2rem",
              color: "black",
            }}
          >
            You are now ready to take advantage of all that Ethereum has to
            offer! Access with keystore file should only be used in an offline
            setting.
          </h4>
          <Button
            style={{ width: "80%", height: "3rem", marginLeft: "10%" }}
            onClick={() => navigate("/create")}
          >
            Create new Wallet
          </Button>
        </Col>
        <Col span={12}>
          <img
            src="https://www.myetherwallet.com/img/icon-keystore-mew.b4b1615e.png"
            alt="Done"
            style={{
              color: "#1677ff",
              width: "17rem",
              marginTop: "3rem",
              marginLeft: "10px",
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default Step3WellDone;
