import React from "react";
import { Card } from "antd";
import { AiOutlineFileDone } from "react-icons/ai";

const { Meta } = Card;

const CreateMnemonicPhraseCard: React.FC = () => {
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
        description={
          " Using a Mnemonic Phrase online makes your wallet more vulnerable to loss of funds. We don’t recommend this method of wallet creation. "
        }
      />
    </Card>
  );
};

export default CreateMnemonicPhraseCard;
