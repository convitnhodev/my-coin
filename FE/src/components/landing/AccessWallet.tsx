import React from "react";
import { Card } from "antd";
import { PiKeyReturnFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const AccessWalletCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card
      className="card-layout"
      onClick={() => {
        navigate("/access");
      }}
    >
      <Meta
        avatar={<PiKeyReturnFill size={60} color="#fba801" />}
        title="Access my Wallet"
        description={
          "Access your existing wallet securely using a Keystore File or Mnemonic Phrase. " +
          "If you already have a wallet created, use this option to import and access it " +
          "by providing your Keystore File or entering your Mnemonic Phrase."
        }
      />
    </Card>
  );
};

export default AccessWalletCard;
