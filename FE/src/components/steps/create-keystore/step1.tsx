import React, { useState } from "react";
import { Form, Input } from "antd";

interface FormProps {
  isEnable: (value: boolean) => void;
  providePassword: (value: string) => void;
}

const Step1CreatePassword: React.FC<FormProps> = ({
  isEnable,
  providePassword,
}) => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const inputStyle: React.CSSProperties = {
    height: 70,
    fontSize: 20,
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 8) {
      const newPassword = e.target.value;
      setPassword(e.target.value);
      if (newPassword === confirmPassword && newPassword.length >= 8) {
        isEnable(true);
        providePassword(password);
        return;
      }

      isEnable(false);
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(e.target.value);

    if (password === newConfirmPassword && newConfirmPassword.length >= 8) {
      isEnable(true);
      providePassword(password);
      return;
    }

    isEnable(false);
  };
  return (
    <>
      <h3>STEP 1:</h3>
      <h3 style={{ color: "black", fontSize: 25 }}>Create Password</h3>
      <Form name="basic" layout="vertical" style={{ lineHeight: 30 }}>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 8, message: "Password must be at least 8 characters!" },
          ]}
        >
          <Input.Password style={inputStyle} onChange={handlePasswordChange} />
        </Form.Item>

        <Form.Item
          label="Confirm password"
          name="confirmPassword"
          rules={[
            { required: true },
            {
              validator: (_, value) =>
                value === password
                  ? Promise.resolve()
                  : Promise.reject("The two passwords do not match!"),
            },
          ]}
          style={{ marginTop: 20 }}
        >
          <Input.Password
            style={inputStyle}
            onChange={handleConfirmPasswordChange}
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default Step1CreatePassword;
