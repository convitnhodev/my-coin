import React from "react";
import { Card } from "antd";
import { GoPasskeyFill } from "react-icons/go";

const { Meta } = Card;

const AccessPrivateKeyCard: React.FC = () => {
  return (
    <Card
      className="card-layout"
      onClick={() => {
        window.location.replace("#private-key");
      }}
    >
      <Meta
        avatar={<GoPasskeyFill size={60} color="#fba801" />}
        title="Private Key"
        description={" Using a private ket to access your wallet. "}
      />
    </Card>
  );
};

export default AccessPrivateKeyCard;
