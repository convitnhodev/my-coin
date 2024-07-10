import React from "react";
import CreateWalletCard from "../../components/landing/CreateWallet";
import AccessWalletCard from "../../components/landing/AccessWallet";

const LandingPage: React.FC = () => {
  return (
    <div className="container">
      <div>
        <img src="/horsecoin.png"></img>
        <h1>MY COIN</h1>
      </div>

      <div>
        <CreateWalletCard />
        <AccessWalletCard />
      </div>
    </div>
  );
};

export default LandingPage;
