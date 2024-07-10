import React from "react";
import { Modal, Collapse, Button, notification } from "antd";
import { CopyOutlined } from "@ant-design/icons";

interface DetailWalletModalProps {
  visible: boolean;
  onClose: () => void;
}

const DetailWalletModal: React.FC<DetailWalletModalProps> = ({
  visible,
  onClose,
}) => {
  const addressWallet = "wallet Address";
  const privateKey = "private key";

  const handleCopyText = (str: string) => {
    navigator.clipboard.writeText(str);

    notification.success({
      message: "Copied Success!",
      description: `"${str}" has been copied to clipboard.`,
    });
  };

  return (
    <Modal
      title="Wallet Details"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Collapse
        size="middle"
        style={{ marginBottom: "10px" }}
        items={[
          {
            key: "1",
            label: "Wallet Address",
            children: (
              <div>
                <p>{addressWallet}</p>
                <Button
                  className="copyBtn"
                  icon={<CopyOutlined />}
                  onClick={() => handleCopyText(addressWallet)}
                ></Button>
              </div>
            ),
          },
        ]}
      />
      <Collapse
        size="middle"
        items={[
          {
            key: "1",
            label: "Private Key",
            children: (
              <div>
                <p>{privateKey}</p>
                <Button
                  className="copyBtn"
                  icon={<CopyOutlined />}
                  onClick={() => handleCopyText(privateKey)}
                ></Button>
              </div>
            ),
          },
        ]}
      />
    </Modal>
  );
};

export default DetailWalletModal;
