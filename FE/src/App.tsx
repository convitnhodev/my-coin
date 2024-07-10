import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import AntdProvider from "./provider/AntdProvider";
import "./styles/index.css";
import { AuthProvider } from "./provider/authContext";

function App() {
  return (
    <AuthProvider>
      <AntdProvider>
        <RouterProvider router={router} />
      </AntdProvider>
    </AuthProvider>
  );
}

export default App;
