import React, { useState } from "react";
import { Row, Col } from "antd";
import Menus from "./Menus";
import Tabs from "./Tabs";
import Content from "./Content";

const App = () => {
  const [select, setSelect] = useState({});

  const [chartsObj, dispatch] = React.useReducer((state: any, action: any) => {
    //数据控制中心
    const {
      id,
      left,
      top,
      active,
      type,
      width,
      height,
      fatherView,
      view,
      value,
      option,
    } = action;

    switch (type) {
      case "move": //保存拖拽后的图表信息
        return { ...state, [id]: { ...state[id], left, top } };
      case "delete": //从数据中删除对应的图表信息
        delete state[id];
        return { ...state };
      case "activeClass": //给选中的图表添加选中的样式
        Object.keys(state).map((item) => {
          if (item === id) {
            state[item].active = true;
            return item;
          }
          state[item].active = false;
          return item;
        });
        return { ...state };
      case "changeview": //改变图表的宽高， 位置， 保存对应的信息
        return { ...state, [id]: { ...state[id], [view]: value } };
      case "changeOption": //改变图表的option样式等信息
        return { ...state, [id]: { ...state[id], option: value } };
      // return { ...state, [id]: { ...state[id], option: { ...state[id]['option'], [fatherView]: { ...state[id]['option'][fatherView], [view]: value } } } }
      default:
        //默认就是创建一个对应的图表，添加到state中
        // return { ...state, [id]: { id, type, active, left, top, width, height, option } }
        return {
          ...state,
          [id]: {
            type,
            id,
            active: false,
            left: 20,
            top: 20,
            width: width || 500,
            height: height || 350,
            option,
          },
        };
    }
  }, {});

  function onMenuClick(item: any) {
    console.log(item);
  }

  const changeView = (
    type: any,
    value: any,
    id: any,
    view: any,
    fatherView = ""
  ) => {
    //右侧菜单栏改变对应图表数据的样式
    if (type === "changeOption") {
      setSelect((pre) => ({ ...pre, option: value }));
      // setSelect(pre => ({ ...pre, option: { ...pre['option'], [fatherView]: { ...pre['option'][fatherView], [view]: value } } }))
    } else {
      setSelect((pre) => ({ ...pre, [view]: value }));
    }
    dispatch({ type, value, id, fatherView, view });
  };

  return (
    <Row className="app">
      <Col className="left" flex="150px">
        <Menus
          data={{ line: ["LineBasic", "LineHigh"] }}
          menuClick={onMenuClick}
        />
      </Col>
      <Col className="center" flex="auto">
        <Content />
      </Col>
      <Col className="right" flex="150px">
        <Tabs changeView={changeView} select={select} />
      </Col>
    </Row>
  );
};

export default App;
