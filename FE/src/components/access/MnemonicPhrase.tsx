import React from "react";
import { Card } from "antd";
import { AiOutlineFileDone } from "react-icons/ai";

const { Meta } = Card;

const AccessMnemonicPhraseCard: React.FC = () => {
  return (
    <Card
      className="card-layout"
      onClick={() => {
        window.location.replace("#phrase");
      }}
    >
      <Meta
        avatar={<AiOutlineFileDone size={60} color="#fba801" />}
        title="Mnemonic Phrase"
        description={" Using a Mnemonic Phrase to access your wallet. "}
      />
    </Card>
  );
};

export default AccessMnemonicPhraseCard;
