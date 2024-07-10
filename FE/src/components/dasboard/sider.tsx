import { Layout, Menu } from "antd";
import AvatarDashboard from "../dasboard/avatar";
import { IoMdSettings } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { FaHistory } from "react-icons/fa";
import { GiBuyCard } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../provider/authContext";

const { Sider } = Layout;

const items = [
  {
    key: "1",
    icon: <MdDashboard />,
    label: "Dashboard",
  },
  {
    key: "2",
    icon: <FaMoneyBillTransfer />,
    label: "Transfer",
  },
  {
    key: "3",
    icon: <FaHistory />,
    label: "History",
  },
  {
    key: "4",
    icon: <GiBuyCard />,
    label: "Buy",
  },
];

const SiderDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { signOut } = useAuth();

  const setDefaultKey = () => {
    const { pathname } = location;

    console.log(pathname);

    switch (pathname) {
      case "/transfer":
        return "2";
        break;
      case "/history":
        return "3";
        break;
      case "/buy":
        return "4";
        break;
      default:
        return "1";
        break;
    }
  };

  const clickMenu = (key: string) => {
    switch (key) {
      case "2":
        navigate("/transfer");
        break;
      case "3":
        navigate("/history");
        break;
      case "4":
        navigate("/buy");
        break;
      default:
        navigate("/dashboard");
        break;
    }
  };

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      width={"18rem"}
      style={{ height: "100vh" }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <img style={{ width: "4rem" }} src="/horsecoin.png"></img>
        <h1 style={{ color: "white", marginLeft: "10px", marginTop: "1.3rem" }}>
          MY COIN
        </h1>
      </div>

      <AvatarDashboard />

      <div className="demo-logo-vertical" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[setDefaultKey()]}>
        {items.map((item) => (
          <Menu.Item
            key={item.key}
            onClick={() => {
              clickMenu(item.key);
            }}
            icon={item.icon}
            style={{ height: "3rem" }}
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu>

      <Menu theme="dark" mode="inline" style={{ marginTop: "23rem" }}>
        <Menu.Item disabled style={{ height: "3rem" }} icon={<IoMdSettings />}>
          Setting
        </Menu.Item>
        <Menu.Item
          onClick={handleSignOut}
          style={{ height: "3rem" }}
          icon={<TbLogout2 />}
        >
          Sign out
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SiderDashboard;
