import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Card,
  Col,
  Row
} from 'antd';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

const { Title } = Typography;
const CardRating = (props) => {
  const {
      boxRateColor, title, rate, desc
    } = props;
  return (
    <Card style={{
      width: 'auto', height: 'auto', background: '#fff0fd', border: 0, borderRadius: 5
    }}
    >
      <Row>
        <Col xl={16} md={12}>
          <div style={{ textAlign: 'start' }}>
            <Title level={3} style={{ margin: 0 }}>{title}</Title>
            <Title level={4} style={{ margin: 0, color: '#C5C1BF' }}>{desc}</Title>
          </div>
        </Col>
        <Col xl={6} md={12}>
          <div style={{
            background: boxRateColor, borderRadius: '5%', paddingTop: 20, paddingBottom: 10
          }}
          >
            <Title level={2} style={{ color: 'white' }}>{rate}</Title>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  kpiReducers: state.kpiReducers
});


const connectToComponent = connect(
  mapStateToProps
)(CardRating);

export default withRouter(connectToComponent);

CardRating.propTypes = {
  boxRateColor: PropTypes.string,
  title: PropTypes.string,
  rate: PropTypes.string,
  desc: PropTypes.string
};
