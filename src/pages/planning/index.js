import React, { Component } from "react";
import Layout from "../../layout/dashboard";
import { Steps } from "antd";

const { Step } = Steps;

class Planning extends Component {
  handleSaveDraft = () => {};
  render() {
    // function callback(key) {
    //   console.log(key);
    // }
    return (
      <div>
        <Layout>
          <Steps current={0}>
            <Step title="Fill KPI Form" description="This is a description." />
            <Step
              title="Save Draft"
              subTitle="Left 00:00:08"
              description="This is a description."
            />
            <Step
              title="Submit & Complete"
              description="This is a description."
            />
          </Steps>
        </Layout>
      </div>
    );
  }
}
export default Planning;
