import { Card, notification } from "antd";
import React, { useState } from "react";
import { Steps, theme, Button } from "antd";
import { useNavigate } from "react-router-dom";
import Step1AccessByKeystore from "../../components/steps/access-keystore/step1";
import Step2EnterPassword from "../../components/steps/access-keystore/step2";
import axiosInstance from "../../configs/axios.config";
import { useAuth } from "../../provider/authContext";
const CreateByKeystorePage: React.FC = () => {
  const { token } = theme.useToken();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [disabledNext, setDisabledNext] = useState<boolean>(true);
  const [keystoreFileContent, setKeystoreFileContent] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const nextAndReturnKeystore = (content: any) => {
    setKeystoreFileContent(content);
    setCurrent(current + 1);
  };

  const enableNextAndReturnPassword = (passwordStr: string) => {
    setPassword(passwordStr);
    setDisabledNext(passwordStr.length < 8); // Disable next button if password length is less than 8
  };

  const handleNext = async () => {
    try {
      const bodyRequest = {
        password: password,
        keystoreFileContent: keystoreFileContent,
      };

      let result = await axiosInstance.post("/wallets/access", bodyRequest);

      if (result.data.statusCode !== 200) {
        notification.error({
          message: "Access Wallet Failed",
          description: "Wrong keystore file or password!",
        });

        return;
      }

      signIn(result.data.data);
      navigate("/dashboard");
    } catch (error) {
      notification.error({
        message: "Access Wallet Failed",
        description: "Something went wrong!",
      });
      console.log(error);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Step 1",
      subTitle: "Select file",
      content: (
        <Step1AccessByKeystore nextAndReturnKeystore={nextAndReturnKeystore} />
      ),
    },
    {
      title: "Step 2",
      subTitle: "Enter Password",
      content: (
        <Step2EnterPassword
          enableNextAndReturnPassword={enableNextAndReturnPassword}
        />
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: "1",
    height: "24rem",
    width: "590px",
    textAlign: "left",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    paddingLeft: "10px",
    paddingRight: "10px",
  };

  return (
    <>
      <Card style={{ width: "40rem", height: "43rem" }}>
        <div style={{ height: "100%" }}>
          <h2>Create Wallet with Keystore File</h2>
          <Steps current={current} items={items} style={{ marginTop: 34 }} />
          <div style={contentStyle}>{steps[current].content}</div>
        </div>
        <div style={{ marginTop: "2rem" }}>
          {current === 1 && (
            <Button
              disabled={disabledNext}
              type="primary"
              style={{ width: "6rem", height: "3rem" }}
              onClick={handleNext}
            >
              Next
            </Button>
          )}
          {current === 1 && (
            <Button
              style={{ width: "6rem", height: "3rem", marginLeft: "20px" }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
        </div>
      </Card>
    </>
  );
};

export default CreateByKeystorePage;
