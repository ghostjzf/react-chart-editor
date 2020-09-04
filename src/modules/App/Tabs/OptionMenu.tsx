import React, { useState, useEffect } from "react";
import { Input, Menu } from "antd";

const { SubMenu } = Menu;

const OptionMenu = (props: any) => {
  const { option, changeView, id } = props;
  const [openKeys, setOpenKeys] = useState<any[]>([]);
  const [view, setView] = useState<any>({});

  let rootSubmenuKeys = Object.keys(option),
    res;
  useEffect(
    () => {
      console.log(option);
      setView(option);
    },
    [option]
  );

  const onOpenChange = (key: any) => {
    // 控制菜单开合的方法

    const latestOpenKey = key.find((key: any) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(key);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  function deepCopy(obj: any) {
    var result: any = Array.isArray(obj) ? [] : {};

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          result[key] = deepCopy(obj[key]); //递归复制
        } else {
          result[key] = obj[key];
        }
      }
    }
    return result;
  }

  const inputOnChange = (e: any, subitem: any, item: any, fatherItem = "") => {
    e.persist();
    let value = e.target.value;
    console.log(view);
    if (fatherItem) {
      setView((pre: any) => ({
        ...pre,
        [fatherItem]: {
          ...pre[fatherItem],
          [item]: { ...pre[item], [subitem]: value },
        },
      }));
      return;
    }
    console.log(item, item[subitem]);
    setView((pre: any) => ({
      ...pre,
      [item]: { ...pre[item], [subitem]: value },
    }));
  };
  const onPressEnter = (e: any, subitem: any, item: any, fatherItem = "") => {
    //input框监听回车事件， 改变对应图表的样式
    e.persist();
    res = deepCopy(option);

    let value = e.target.value;
    if (value === "true") {
      value = true;
    }
    if (value === "false") {
      value = false;
    }

    if (fatherItem) {
      res[fatherItem][item][subitem] = value;
    }
    res[item][subitem] = value;
    changeView("changeOption", res, id);
  };

  return (
    <Menu
      className="tab-menu"
      theme="dark"
      mode="inline"
      openKeys={openKeys}
      onOpenChange={(v) => onOpenChange(v)}
      style={{ width: "100%", height: "100%" }}
    >
      {Object.keys(view).map((v) => {
        if (v === "data" || v === "series") {
          return null;
        }
        return (
          <SubMenu
            className="tab-submenu"
            key={v}
            title={
              <span>
                <span>{v}</span>
              </span>
            }
          >
            {Object.keys(view[v]).map((item) => {
              if (item === "data" || item === "series") {
                return null;
              }
              if (typeof view[v][item] === "object") {
                return (
                  <SubMenu
                    className="tab-subitemmenu"
                    key={item}
                    title={
                      <span>
                        <span>{item}</span>
                      </span>
                    }
                  >
                    {Object.keys(view[v][item]).map((subitem) => {
                      return (
                        <Menu.Item key={subitem} className="tab-submenuitem">
                          <span style={{ marginRight: "5px" }}>{subitem}</span>
                          <Input
                            onPressEnter={(e) =>
                              onPressEnter(e, subitem, item, v)
                            }
                            className="submenuitem-input"
                            onChange={(e) => inputOnChange(e, subitem, item, v)}
                            value={view[v][subitem]}
                          />
                        </Menu.Item>
                      );
                    })}
                  </SubMenu>
                );
              }
              return (
                <Menu.Item key={item} className="tab-menuitem">
                  <span style={{ marginRight: "5px" }}>{item}</span>
                  <Input
                    onPressEnter={(e) => onPressEnter(e, item, v)}
                    className="menuitem-input"
                    onChange={(e) => inputOnChange(e, item, v)}
                    value={view[v][item]}
                  />
                </Menu.Item>
              );
            })}
          </SubMenu>
        );
      })}
    </Menu>
  );
};

export default OptionMenu;
