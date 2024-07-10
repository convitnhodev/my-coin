import { PiKeyReturnFill } from "react-icons/pi";

const ReturnButton: React.FC = () => (
  <button className="returnLanding" style={{ left: "10px" }}>
    <PiKeyReturnFill
      size={50}
      onClick={() => {
        window.location.replace("#");
      }}
    />
  </button>
);

export default ReturnButton;
