import React from 'react';
import {
 Menu, List, Typography, Divider, Empty, Icon
} from 'antd';
import { Link } from 'react-router-dom';
import { navigatorManager, navigatorEmp } from '../../../../../utils/navigatorNotif';

export const accountMenu = (logout) => () => (
  <Menu>
    <Menu.Item>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a href="#" onClick={logout}>Logout</a>
    </Menu.Item>
  </Menu>
  );

export const langMenu = (
  <Menu>
    <Menu.Item>
      {/* Indonesia */}
    </Menu.Item>
    <Menu.Item>
      {/* English */}
    </Menu.Item>
  </Menu>
 );

export const notifMenu = (data, userId) => () => {
  const navigate = (item) => () => {
    if (item.userId !== userId) {
      return navigatorManager(item.currentStep, item.userId);
    } else {
      return navigatorEmp(item.currentStep);
    }
  };

  const dateToday = (lastDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = oneDay * 7;
    const oneMonth = oneWeek * 4;
    const ldate = new Date(lastDate);
    const ndate = new Date();
    const diffDays = Math.round(Math.abs((ndate - ldate) / oneDay));
    const diffWeeks = Math.round(Math.abs((ndate - ldate) / oneWeek));
    const diffMos = Math.round(Math.abs((ndate - ldate) / oneMonth));
    if (diffDays === 1) {
      return 'Today';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffWeeks <= 1) {
      return 'a week ago';
    } else if (diffWeeks < 4) {
      return `${diffWeeks} weeks ago`;
    } else if (diffMos <= 1) {
      return 'a month ago';
    } else if (diffMos <= 4) {
      return `${diffMos} months ago`;
    } else {
      return lastDate;
    }
  };

  return (
    <Menu style={{ width: 300, maxHeight: '100vh' }}>
      <div style={{
        backgroundColor: '#F9FAFE',
        paddingTop: 20,
        paddingBottom: 20,
        textAlign: 'center'
      }}
      >
        <Typography.Text strong style={{ fontSize: 18 }}>User Notifications</Typography.Text>
      </div>
      <Divider style={{ margin: 0 }} />
      {data.length !== 0 ? data.map((item, index) => (
        <Menu.Item key={index} style={{ whiteSpace: 'break-spaces' }}>
          <Link to={navigate(item)}>
            <Typography.Paragraph style={{ marginBottom: 0 }}>{item.name}</Typography.Paragraph>
            <Typography.Text style={{ marginTop: 0, fontSize: 10 }}>{dateToday(item.lastUpdate)}</Typography.Text>
          </Link>
        </Menu.Item>
      )) :
      <div>
        <Empty
          description="There's no notifications for you"
        />
      </div>}
    </Menu>
  );
};
