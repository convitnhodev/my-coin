import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CloseButton from "../../components/button/CloseButton";
import CreateByKeystorePage from "./ByKeystore";
import CreateByMnemonicPhrasePage from "./ByPhrase";
import ChooseMethodPage from "./ChooseMethod";
import ReturnButton from "../../components/button/ReturnButton";

const CreatePage: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set mounted to true to trigger slide animation on mount
    setMounted(true);
  }, []);

  // Extract the route hash from window.location
  const routeHash = window.location.hash.substr(1);

  // Define the component to render based on routeHash
  let componentToRender;

  switch (routeHash) {
    case "keystore":
      componentToRender = <CreateByKeystorePage />;
      break;
    case "phrase":
      componentToRender = <CreateByMnemonicPhrasePage />;
      break;
    default:
      componentToRender = <ChooseMethodPage />;
      break;
  }

  return (
    <>
      <CloseButton navigate={navigate} />

      {window.location.hash.substr(1) !== "" ? <ReturnButton /> : ""}
      <div className={`container ${mounted ? "slide-down" : "slide-up"}`}>
        {componentToRender}
      </div>
    </>
  );
};

export default CreatePage;
