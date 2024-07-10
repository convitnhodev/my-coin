import React from "react";
import {
  Divider,
  Form,
  InputNumber,
  Input,
  Button,
  Row,
  Col,
  Select,
  notification,
} from "antd";
import { useAuth } from "../../provider/authContext";
import axiosInstance from "../../configs/axios.config";

const { Option } = Select;

const TransferPage: React.FC = () => {
  const { getWalletAddress } = useAuth();
  const walletAddress = getWalletAddress();
  const currencyOptions = ["MC"];
  const transactionFee = 2;

  const handleTransfer = async (values: any) => {
    try {
      const bodyRequest = {
        from: walletAddress,
        to: values.to,
        amount: values.amount,
      };

      let result = await axiosInstance.post("/transactions", bodyRequest);

      if (result.data.statusCode !== 200) {
        notification.error({
          message: "Failed to Tranfer",
          description: "Not found destination address",
        });

        return;
      }

      notification.success({
        message: "Tranfer Successfully",
      });
    } catch (error) {
      notification.error({
        message: "Failed to Tranfer",
        description: "Not found destination address",
      });
      console.log(error);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Send Transaction</h1>
      <Divider />

      <Form
        name="transferForm"
        onFinish={handleTransfer}
        layout="vertical"
        initialValues={{ type: currencyOptions[0] }}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item label="From" name="from">
              <Input
                disabled
                value={walletAddress ? walletAddress : "walletAdress"}
                placeholder={walletAddress ? walletAddress : "walletAdress"}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="To"
              name="to"
              rules={[
                { required: true, message: "Please enter recipient address" },
              ]}
            >
              <Input placeholder="Recipient Address" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Type"
              name="type"
              rules={[
                { required: true, message: "Please select currency type" },
              ]}
            >
              <Select placeholder="Select Currency">
                {currencyOptions.map((currency) => (
                  <Option key={currency} value={currency}>
                    {currency}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Amount"
              name="amount"
              rules={[
                { required: true, message: "Please enter transaction amount" },
                {
                  type: "number",
                  min: 0.01,
                  message: "Amount must be at least 0.01",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={1}
                step={0.01}
                precision={2}
                placeholder="Transaction Amount"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <p>Transaction fee: {transactionFee} MC</p>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Transfer
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default TransferPage;
