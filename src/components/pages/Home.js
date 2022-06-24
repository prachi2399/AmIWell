import React, { useState } from "react";
import CardDesc from "../common/CardDesc";
import Amwell from "../../assets/amwell.jpeg";
import { Button, Col, Form, Row, Select } from "antd";
const { Option } = Select;

function Home({ symptoms, doctors, setDoctors }) {
  const [result, setResult] = useState("");
  // get diagnosis
  const onHandleSubmit = async (values) => {
    console.log(values, "shsh");
    const data = values?.symptoms?.join(",");
    try {
      const response = await fetch("http://localhost:4001/api/get-diagnosis", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptoms: data }),
      });
      const result = await response.json();
      getDoctorsBySymptoms(values?.symptoms);
      setResult(result?.data);
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  const getDoctorsBySymptoms = async (values) => {
    try {
      const response = await fetch("http://localhost:4001/api/get-doctors", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptoms: values }),
      });
      const result = await response.json();
      setDoctors(result?.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid Home-page">
      <main>
        <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-white">
          <div className="col-md-5 p-lg-5 mx-auto my-5">
            <h1 className="display-4 fw-normal">
              <img class="mb-4" src={Amwell} alt="" width="100" />
            </h1>
            <p className="lead fw-normal">
              AmWell provides a general symptom assessment tool to help you
              identify the symptoms of your health condition.
            </p>
            <Form onFinish={onHandleSubmit}>
              <Row>
                <Col span={20}>
                  <Form.Item name="symptoms">
                    <Select
                      size="large"
                      mode="tags"
                      style={{ width: "100%" }}
                      placeholder="Select Symptoms"
                    >
                      {symptoms?.map((item, i) => (
                        <Option key={i} value={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Button size="large" htmlType="submit">
                    Search
                  </Button>
                </Col>
              </Row>
            </Form>
            {result && <h3>You might have - {result}</h3>}
          </div>
          <div className="product-device shadow-sm d-none d-md-block"></div>
          <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
        </div>
        <div className="row">
          {doctors.map((item, i) => (
            <CardDesc key={i} {...item} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
