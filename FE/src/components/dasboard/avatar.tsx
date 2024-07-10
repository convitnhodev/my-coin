import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space, Button, Row, Col, notification } from "antd";
import { LuRefreshCcw } from "react-icons/lu";
import { CopyOutlined } from "@ant-design/icons";
import { IoIosPrint } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { useAuth } from "../../provider/authContext";
import axiosInstance from "../../configs/axios.config";
import { Wallet } from "../../types/wallet";
import { useNavigate } from "react-router-dom";

const iconStyle: React.CSSProperties = {
  fontSize: "15px",
  marginRight: "10px",
};

const AvatarDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);
  const [wallet, setWallet] = useState<Wallet | null>(null);

  const { getWalletAddress, signOut } = useAuth();
  const walletAddress = getWalletAddress();

  const fetchWallet = async () => {
    try {
      let result = await axiosInstance.get(`/wallets/${walletAddress}`);

      if (result.data.statusCode !== 200) {
        notification.error({
          message: "Failed to get Wallet",
          description: "Unknown Address",
        });

        return;
      }

      console.log("result.data", result.data.data);
      setWallet(result.data.data);
    } catch (error) {
      notification.error({
        message: "Failed to get Wallet",
        description: "Unknown Address",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  const handleCopyText = () => {
    if (wallet) {
      navigator.clipboard.writeText(wallet.address);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 3000);

      notification.success({
        message: "Address Copied",
        description: `Address "${formatAddress(
          wallet?.address
        )}" has been copied to clipboard.`,
      });
    }
  };

  const formatAddress = (address: string) => {
    console.log("address: ", address);
    const firstChars = address.slice(0, 6);
    const lastChars = address.slice(-4);
    return `${firstChars}...${lastChars}`;
  };

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <a onClick={fetchWallet}>
          <LuRefreshCcw style={iconStyle} /> Refresh Balance
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <a>
          <IoIosPrint style={iconStyle} /> View paper wallet
        </a>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <a onClick={handleSignOut}>
          <BiLogOut style={iconStyle} /> Sign out
        </a>
      ),
      key: "3",
    },
  ];

  return (
    <div style={{ height: "12rem" }} className="avatar-nav">
      <Row
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "-2rem",
        }}
      >
        <Dropdown menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Space className="portfolio-menu">
              PORTFOLIO VALUE
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
        <p
          style={{
            color: "white",
            fontSize: "0.7rem",
            marginLeft: "15px",
            cursor: "pointer",
          }}
        >
          {wallet && formatAddress(wallet.address)}
        </p>
      </Row>
      <Row>
        <h1 style={{ fontSize: "2.5rem", color: "white", marginLeft: "5px" }}>
          {wallet ? "$" + wallet.amountUSD : "$0.00"}
        </h1>
      </Row>
      <Row>
        <Col span={20}>
          <h2
            style={{
              marginLeft: "15px",
              marginTop: "5px",
              color: "white",
              paddingBottom: "10px",
              fontWeight: "normal",
            }}
          >
            {wallet ? wallet.amountMC + "MC" : "0 MC"}
          </h2>{" "}
        </Col>
        <Col span={4}>
          <Button
            className="copyBtn"
            icon={<CopyOutlined />}
            onClick={handleCopyText}
            disabled={copied}
          ></Button>
        </Col>
      </Row>
    </div>
  );
  {
  }
};

export default AvatarDashboard;
