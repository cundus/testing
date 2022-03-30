import React from "react";
import { Menu, Typography, Divider, Empty, Avatar, Icon } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  navigatorManager,
  navigatorEmp,
} from "../../../../../utils/navigatorNotif";

export const accountMenu =
  (logout, { fullName, avatar, authReducer }) =>
  () =>
    (
      <Menu>
        <Menu.Item style={{cursor: 'default', marginBottom: 10, display: 'flex'}} className="nohover">
          <Avatar
            shape="square"
            size={"large"}
            src={avatar}
            icon="user"
          />
          <div style={{marginLeft: 10, display: 'flex', flexDirection: 'column'}}>
            <span style={{fontWeight: 'bold',}}>{fullName}</span>
            <span style={{fontSize: 10}}>{authReducer?.email}</span>
          </div>
        </Menu.Item>
        <Menu.Item onClick={logout}>
         <Icon type="logout" style={{fontSize: 16}}/>
         <span style={{marginLeft: 10}}>Logout</span> 
        </Menu.Item>
      </Menu>
    );

export const langMenu = (
  <Menu>
    <Menu.Item>{/* Indonesia */}</Menu.Item>
    <Menu.Item>{/* English */}</Menu.Item>
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
    const a = moment(new Date(lastDate));
    const b = moment(new Date());
    const diffDays = b.diff(a, "days");
    const diffWeeks = a.diff(b, "week");
    const diffMos = a.diff(b, "months");
    if (diffDays < 1) {
      return "Today";
    } else if (diffDays <= 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffWeeks <= 1) {
      return "a week ago";
    } else if (diffWeeks < 4) {
      return `${diffWeeks} weeks ago`;
    } else if (diffMos <= 1) {
      return "a month ago";
    } else if (diffMos <= 4) {
      return `${diffMos} months ago`;
    } else {
      return lastDate;
    }
  };

  return (
    <Menu style={{ width: 300, maxHeight: "400px", overflowY: "scroll" }}>
      <div
        style={{
          backgroundColor: "#F9FAFE",
          paddingTop: 20,
          paddingBottom: 20,
          textAlign: "center",
        }}
      >
        <Typography.Text strong style={{ fontSize: 18 }}>
          User Notifications
        </Typography.Text>
      </div>
      <Divider style={{ margin: 0 }} />
      {data.length !== 0 ? (
        data.map((item, index) => (
          <Menu.Item key={index} style={{ whiteSpace: "break-spaces" }}>
            <Link to={navigate(item)}>
              <Typography.Paragraph style={{ marginBottom: 0 }}>
                {item.name}
              </Typography.Paragraph>
              <Typography.Text style={{ marginTop: 0, fontSize: 10 }}>
                {dateToday(item.lastUpdate)}
              </Typography.Text>
            </Link>
          </Menu.Item>
        ))
      ) : (
        <div>
          <Empty description="There's no notifications for you" />
        </div>
      )}
    </Menu>
  );
};
