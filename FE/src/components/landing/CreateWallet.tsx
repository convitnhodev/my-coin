import React from "react";
import { Card } from "antd";
import { FaWallet } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

const CreateWalletCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card
      className="card-layout"
      onClick={() => {
        navigate("/create");
      }}
    >
      <Meta
        avatar={<FaWallet size={60} color="#359ECA" />}
        title="Create new Wallet"
        description={
          "Create a new wallet securely by generating a Keystore File or Mnemonic Phrase. " +
          "This option allows you to create a brand-new wallet for storing your assets. " +
          "You can either download your Keystore File or write down your Mnemonic Phrase " +
          "for future access and recovery of your wallet."
        }
      />
    </Card>
  );
};

export default CreateWalletCard;
