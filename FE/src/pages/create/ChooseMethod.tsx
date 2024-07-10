import CreateKeystoreCard from "../../components/create/Keystore";
import CreateMnemonicPhraseCard from "../../components/create/MnemonicPhrase";

const ChooseMethodPage: React.FC = () => {
  return (
    <>
      <div>
        <h1>CREATE NEW WALLET</h1>
      </div>

      <div>
        <CreateKeystoreCard />
        <CreateMnemonicPhraseCard />
      </div>
    </>
  );
};

export default ChooseMethodPage;
