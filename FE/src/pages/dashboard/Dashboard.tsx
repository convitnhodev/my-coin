import { Row, Col, Button } from "antd";
import { Card } from "antd";
import { IoGitNetworkSharp } from "react-icons/io5";
import { LiaAddressCardSolid } from "react-icons/lia";
import { MdAccountBalance } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { BiTransferAlt } from "react-icons/bi";
import DetailWalletModal from "./detailWalletModal";
import { useState } from "react";
import LineChartBalanceFluctuations from "../../components/dasboard/chart";

const { Meta } = Card;

const Dashboard = () => {
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleShowDetailModal = () => {
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
  };

  const walletAddress = "adress here";
  const balance = {
    mc: 45000,
    usd: 1000,
  };
  const newNW = 1;

  return (
    <>
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

      <h1>Statistical</h1>

      <LineChartBalanceFluctuations />

      <DetailWalletModal
        visible={showDetailModal}
        onClose={handleCloseDetailModal}
      />
    </>
  );
};

export default Dashboard;
