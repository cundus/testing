import React from 'react';
import { Menu, List, Typography } from 'antd';
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
      return navigatorManager(item.currentStep, userId);
    } else {
      return navigatorEmp(item.currentStep);
    }
  };

  return (
    <List
      style={{ width: 300 }}
      header={
        <div style={{ textAlign: 'center', paddingTop: 20, paddingBottom: 20 }}>
          <Typography.Text style={{ fontSize: 18 }}>User Notifications </Typography.Text>
          {/* <Typography.Text mark>2 New!</Typography.Text> */}
        </div>
        }
      // bordered
      dataSource={data}
      // eslint-disable-next-line react/jsx-no-bind
      renderItem={(item) => (
        <Link to={navigate(item)}>
          <List.Item>
            <Typography.Paragraph>{item.name}</Typography.Paragraph>
          </List.Item>
        </Link>
      )}
    />
  );
};
