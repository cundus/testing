import React from 'react';
import { Layout, Row, Col } from 'antd';

const Footer = () => {
  return (
    <Layout.Footer>
      <Row>
        <Col sm={18} md={20} xs={24}>
          <div>
            {new Date().getFullYear()} &copy; Human Capital - People Services | PT XL Axiata
          </div>
        </Col>
      </Row>
    </Layout.Footer>
  );
};

export default Footer;
