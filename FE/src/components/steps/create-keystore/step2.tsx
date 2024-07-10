import React from "react";
import { Col, Row, Card } from "antd";
import { BsSendArrowUp } from "react-icons/bs";
import { GiRun } from "react-icons/gi";
import { CgCopy } from "react-icons/cg";

const { Meta } = Card;

const iconStyle: React.CSSProperties = {
  height: "5rem",
  marginTop: "20px",
  color: "#1677ff",
};

const notes = [
  {
    cover: <BsSendArrowUp style={iconStyle} />,
    title: "Don't lose it",
    description: "Be careful, it can not be recovered if you lose it.",
  },
  {
    cover: <GiRun style={iconStyle} />,
    title: "Don't share it",
    description:
      "Your funds will be stolen if you use this file on a malicious phishing site.",
  },
  {
    cover: <CgCopy style={iconStyle} />,
    title: "Make a backup",
    description:
      "Secure it like the millions of dollars it may one day be worth.",
  },
];

const Step2DownloadFile: React.FC = () => {
  return (
    <>
      <h3>STEP 2:</h3>
      <h3
        style={{
          color: "black",
          fontSize: 25,
          marginBottom: -5,
        }}
      >
        Download keystore file
      </h3>
      <h5 style={{ color: "black" }}>
        {" "}
        Important things to know before downloading your keystore file.
      </h5>

      <Row gutter={6}>
        {notes.map((note) => {
          return (
            <Col span={8}>
              <Card hoverable style={{ height: "20rem" }} cover={note.cover}>
                <Meta title={note.title} description={note.description} />
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Step2DownloadFile;
