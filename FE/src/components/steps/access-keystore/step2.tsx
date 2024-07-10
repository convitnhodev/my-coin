import React from "react";
import { Form, Input } from "antd";

interface Step2Props {
  enableNextAndReturnPassword: (passwordStr: string) => void;
}

const Step2EnterPassword: React.FC<Step2Props> = ({
  enableNextAndReturnPassword,
}) => {
  const inputStyle: React.CSSProperties = {
    height: 70,
    fontSize: 20,
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    enableNextAndReturnPassword(newPassword); // Notify parent component about password change
  };

  return (
    <>
      <h3>STEP 2:</h3>
      <h3
        style={{
          color: "black",
          fontSize: 25,
        }}
      >
        Enter Password
      </h3>

      <h4
        style={{
          fontWeight: "normal",
          margin: "0 0 16px 0",
          lineHeight: "1.5",
          marginTop: "2rem",
          color: "black",
        }}
      >
        Enter your password to unlock your wallet.
      </h4>

      <Form name="basic" layout="vertical" style={{ marginTop: "5rem" }}>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 8, message: "Password must be at least 8 characters!" },
          ]}
        >
          <Input.Password
            placeholder="Enter password..."
            style={inputStyle}
            onChange={handlePasswordChange}
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default Step2EnterPassword;
