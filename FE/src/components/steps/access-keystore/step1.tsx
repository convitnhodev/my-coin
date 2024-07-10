import React from "react";
import { Col, Row, message } from "antd";

interface Step1Props {
  nextAndReturnKeystore: (content: any) => void;
}

const Step1AccessByKeystore: React.FC<Step1Props> = ({
  nextAndReturnKeystore,
}) => {
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        if (file.type === "application/json") {
          const fileContents = await readFileContents(file);
          console.log(JSON.parse(fileContents));
          nextAndReturnKeystore(JSON.parse(fileContents));
        } else {
          message.error("Please select a JSON file.");
        }
      } catch (error) {
        console.error("Error reading file:", error);
      }
    }
  };

  const readFileContents = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const contents = event.target.result as string;
          resolve(contents);
        } else {
          reject(new Error("Failed to read file contents."));
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(file);
    });
  };

  return (
    <>
      <h3>STEP 1:</h3>
      <h3
        style={{
          color: "black",
          fontSize: 25,
        }}
      >
        Select your Keystore File
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
            Please select the keystore file that unlocks your wallet.
          </h4>

          <input
            type="file"
            onChange={handleFileUpload}
            style={{
              display: "none",
            }}
            id="upload"
          />
          <label htmlFor="upload">
            <div
              style={{
                marginLeft: "1rem",
                width: "10rem",
                height: "3rem",
                backgroundColor: "#1890ff",
                color: "white",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              Select File
            </div>
          </label>
        </Col>
        <Col span={12}>
          <img
            src="/keystorefile.png"
            alt="Keystore File"
            style={{
              width: "17rem",
              marginTop: "1rem",
              marginLeft: "10px",
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default Step1AccessByKeystore;
