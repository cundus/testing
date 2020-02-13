import React from 'react';
import { Menu, List, Typography } from 'antd';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crashdasdasdsa.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.'
];

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

export const notifMenu = (
  <List
    style={{ maxWidth: 300 }}
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
      <List.Item>
        <Typography.Text ellipsis>{item}</Typography.Text>
      </List.Item>
    )}
  />
);
