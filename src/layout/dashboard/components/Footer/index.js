import React from 'react';
import { Layout, Row, Col } from 'antd';

class Footer extends React.Component {
  render() {
    return (
      <Layout.Footer>
        <Row>
          <Col sm={18} md={20} xs={24}>
            <div>
              2019 © Human Capital - People Services
          </div>
          </Col>
          <Col sm={6} md={4} xs={24}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <div>
                About
              </div>
              <div>
                Team
              </div>
              <div>
                Contact
              </div>
            </div>
          </Col>
        </Row>
      </Layout.Footer>
    )
  }
}

export default Footer;
