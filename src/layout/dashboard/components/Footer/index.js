import React from 'react';
import { Layout, Row, Col } from 'antd';

class Footer extends React.Component {
  render() {
    return (
      <Layout.Footer>
        <Row>
          <Col sm={18} md={20} xs={24}>
            <div>
            2019 &copy; Human Capital - People Services | PT XL Axiata
          </div>
          </Col>
        </Row>
      </Layout.Footer>
    )
  }
}

export default Footer;
