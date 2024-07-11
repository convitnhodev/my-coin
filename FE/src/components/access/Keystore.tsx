import React from "react";
import { Card } from "antd";
import { FaFileCode } from "react-icons/fa6";

const { Meta } = Card;

const AccessKeystoreCard: React.FC = () => {
  return (
    <Card
      className="card-layout"
      onClick={() => {
        window.location.replace("#keystore");
      }}
    >
      <Meta
        avatar={<FaFileCode size={60} color="#359ECA" />}
        title="Keystore File"
        description={" Using a keystore file to access your wallet. "}
      />
    </Card>
  );
};

export default AccessKeystoreCard;
