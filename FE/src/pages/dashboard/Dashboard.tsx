import { Row, Col, Button, notification } from "antd";
import { Card } from "antd";
import { IoGitNetworkSharp } from "react-icons/io5";
import { LiaAddressCardSolid } from "react-icons/lia";
import { MdAccountBalance } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { BiTransferAlt } from "react-icons/bi";
import DetailWalletModal from "./detailWalletModal";
import { useEffect, useState } from "react";
import { Wallet } from "../../types/wallet";
import { useAuth } from "../../provider/authContext";
import axiosInstance from "../../configs/axios.config";

const { Meta } = Card;

const Dashboard = () => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [wallet, setWallet] = useState<Wallet | null>(null);

  const { getWalletAddress } = useAuth();
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

  const handleShowDetailModal = () => {
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
  };

  const balance = {
    mc: wallet?.amountMC,
    usd: wallet?.amountUSD,
  };
  const newNW = 1;

  return (
    <>
      <h1>MY COIN DASHBOARD</h1>

      <Row>
        <Col span={8}>
          <Card className="card-dashboard">
            <Meta
              avatar={<LiaAddressCardSolid size={60} color="#1d2776" />}
              title="Address"
              description={walletAddress}
            />
            <Button
              onClick={handleShowDetailModal}
              icon={<CgDetailsMore />}
            ></Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="card-dashboard">
            <Meta
              avatar={<MdAccountBalance size={60} color="#1d2776" />}
              title="Balance"
              description={`${balance.mc}MC &  $${balance.usd}`}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card className="card-dashboard">
            <Meta
              avatar={<IoGitNetworkSharp size={60} color="#1d2776" />}
              title="Network"
              description={` Last block: ${newNW}`}
            />
            <Button icon={<BiTransferAlt />}></Button>
          </Card>
        </Col>
      </Row>

      <DetailWalletModal
        visible={showDetailModal}
        onClose={handleCloseDetailModal}
        wallet={wallet}
      />
    </>
  );
};

export default Dashboard;
