import React from 'react';
import { Menu } from 'antd';

export const accountMenu = (logout) => (
  <Menu>
    <Menu.Item>
        {/* Message */}
        <a href='#' onClick={()=> logout()} >Logout</a>
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
  <Menu>
    <Menu.Item>
        {/* +1 chat */}
    </Menu.Item>
    <Menu.Item>
        {/* +2 else */}
    </Menu.Item>
  </Menu>
);
