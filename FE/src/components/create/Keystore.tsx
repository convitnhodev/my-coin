import React from "react";
import { Card } from "antd";
import { FaFileCode } from "react-icons/fa6";

const { Meta } = Card;

const CreateKeystoreCard: React.FC = () => {
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
        description={
          " Using a keystore file online makes your wallet more vulnerable to loss of funds. We don’t recommend this method of wallet creation. "
        }
      />
    </Card>
  );
};

export default CreateKeystoreCard;
