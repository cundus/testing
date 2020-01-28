import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Card,
  Col,
  Row
} from 'antd';
import { useMediaQuery } from 'react-responsive';

const { Title } = Typography;
const CardRating = (props) => {
  const {
      boxRateColor, title, rate, desc
    } = props;
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });
  return (
    <Card style={{
      width: 'auto',
      height: 'auto',
      background: '#FFF7E4',
      border: 0,
      borderRadius: 5,
      paddingBottom: 30,
      paddingTop: 30
    }}
    >
      <Row>
        <Col xl={18} md={18} lg={18} xs={16}>
          <div style={{ textAlign: 'start', marginLeft: isDesktopOrLaptop ? 100 : 0 }}>
            <Title level={3} style={{ margin: 0 }}>{title}</Title>
            <Title level={4} style={{ margin: 0, color: '#C5C1BF' }}>{desc}</Title>
          </div>
        </Col>
        <Col xl={2} md={2} lg={2} xs={3}>
          <div style={{
            background: boxRateColor, borderRadius: '5%', height: 100, width: 100
          }}
          >
            <Title level={2} style={{ color: 'white' }}>{rate}</Title>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default CardRating;

CardRating.propTypes = {
  boxRateColor: PropTypes.string,
  title: PropTypes.string,
  rate: PropTypes.string,
  desc: PropTypes.string
};
