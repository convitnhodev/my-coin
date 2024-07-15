import { Button, Divider, Form, InputNumber, notification } from "antd";
import { useAuth } from "../../provider/authContext";
import axiosInstance from "../../configs/axios.config";
import { useState } from "react";

const BuyPage: React.FC = () => {
  const [amountSpend, setAmountSpend] = useState<number>(0);

  const { getWalletAddress } = useAuth();
  const walletAddress = getWalletAddress();

  const handleSetAmount = async (values: { buyMC: number }) => {
    setAmountSpend(values.buyMC * 10);
  };

  const handleBuy = async (values: { buyMC: number }) => {
    try {
      const bodyRequest = {
        address: walletAddress,
        amount: values.buyMC,
      };

      let result = await axiosInstance.post("/transactions/mine", bodyRequest);

      if (result.data.statusCode !== 200) {
        notification.error({
          message: "Buy MC Failed",
          description: "Unknown Error",
        });

        return;
      }

      notification.success({
        message: "Buy MC Successfully",
      });
    } catch (error) {
      notification.error({
        message: "Buy MC Failed",
        description: "Unknown Error",
      });
      console.log(error);
    }
  };

  const handleRecharge = async (values: { recharge: number }) => {
    try {
      const bodyRequest = {
        address: walletAddress,
        amount: values.recharge,
      };

      let result = await axiosInstance.post(
        "/transactions/recharge",
        bodyRequest
      );

      if (result.data.statusCode !== 200) {
        notification.error({
          message: "Recharge Failed",
          description: "Unknown Error",
        });

        return;
      }

      notification.success({
        message: "Recharge Successfully",
      });
    } catch (error) {
      notification.error({
        message: "Recharge Failed",
        description: "Unknown Error",
      });
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h1>Buy MC</h1>
        <Divider />
        <Form
          name="buyMCForm"
          layout="vertical"
          onValuesChange={handleSetAmount}
          onFinish={handleBuy}
        >
          <Form.Item
            label="USD is used to buy MC"
            name="buyMC"
            rules={[
              { required: true, message: "Please enter usd to buy mc" },
              {
                type: "number",
                min: 1,
                message: "USD must be at least 1",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} name="buyMC" />
          </Form.Item>
          <p>MC received: {amountSpend} MC</p>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Buy
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div>
        <h1 style={{ marginTop: "20px" }}>Recharge Wallet</h1>
        <Divider />
        <Form name="recharge" layout="vertical" onFinish={handleRecharge}>
          <Form.Item label="From">
            <InputNumber
              disabled
              style={{ width: "100%", marginBottom: "20px" }}
              placeholder="any where"
            />
          </Form.Item>

          <Form.Item
            label="Recharge Wallet (USD)"
            name="recharge"
            rules={[
              { required: true, message: "Please enter USD want to recharge" },
              {
                type: "number",
                min: 1,
                message: "USD must be greater than 1",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} name="recharge" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", marginTop: "20px" }}
            >
              Recharge
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default BuyPage;
