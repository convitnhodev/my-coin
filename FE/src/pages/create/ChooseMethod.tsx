import CreateKeystoreCard from "../../components/create/Keystore";

const ChooseMethodPage: React.FC = () => {
  return (
    <>
      <div>
        <h1>CREATE NEW WALLET</h1>
      </div>

      <div>
        <CreateKeystoreCard />
      </div>
    </>
  );
};

export default ChooseMethodPage;
