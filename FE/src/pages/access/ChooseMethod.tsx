import AccessKeystoreCard from "../../components/access/Keystore";
import AccessMnemonicPhraseCard from "../../components/access/MnemonicPhrase";
import AccessPrivateKeyCard from "../../components/access/PrivateKey";

const ChooseMethodPage: React.FC = () => {
  return (
    <>
      <div>
        <h1>ACCESS MY WALLET</h1>
      </div>

      <div>
        <AccessKeystoreCard />
        <AccessMnemonicPhraseCard />
        <AccessPrivateKeyCard />
      </div>
    </>
  );
};

export default ChooseMethodPage;
