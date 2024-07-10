import { Layout as LayoutAntDesign } from "antd";
import { Outlet } from "react-router-dom";

const { Content } = LayoutAntDesign;

const bodyStyle = {
  fontFamily: "Arial, sans-serif",
  margin: 0,
  padding: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f5f5f5",
};

export default function Layout() {
  return (
    <div style={bodyStyle}>
      <LayoutAntDesign>
        <Content>
          <Outlet />
        </Content>
      </LayoutAntDesign>
    </div>
  );
}
