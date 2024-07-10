import { RiCloseCircleLine } from "react-icons/ri";

const CloseButton: React.FC<{ navigate: any }> = ({ navigate }) => (
  <button className="returnLanding">
    <RiCloseCircleLine
      size={50}
      onClick={() => {
        navigate("/");
      }}
    />
  </button>
);

export default CloseButton;
