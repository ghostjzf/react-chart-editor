import React, { useState } from "react";
import { Menu } from "antd";

const { SubMenu } = Menu;

const Menus: React.FC<{
  menuClick: (itemData: any) => void;
  data: any;
}> = ({ menuClick, data }) => {
  const [openKeys, setOpenKeys] = useState<any[]>([]);

  const rootSubmenuKeys = Object.keys(data);

  const onOpenChange = (openKeys: any) => {
    const latestOpenKey = openKeys.find(
      (key: any) => openKeys.indexOf(key) === -1
    );

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(openKeys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <Menu
      theme="dark"
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{ width: "100%", height: "100%" }}
      onClick={(item) => menuClick(item)}
    >
      {Object.keys(data).map((key: any) => {
        return (
          <SubMenu
            key={key}
            title={
              <span>
                {/* <Icon type={`${v.toLowerCase()}-chart`} /> */}
                <span>{key}</span>
              </span>
            }
          >
            {data[key].map((item: any) => {
              return <Menu.Item key={item}>{item}</Menu.Item>;
            })}
          </SubMenu>
        );
      })}
    </Menu>
  );
};

export default Menus;
