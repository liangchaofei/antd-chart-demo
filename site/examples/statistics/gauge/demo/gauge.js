import { Gauge } from '@ant-design/plots';
import React from 'react';
import ReactDOM from 'react-dom';

const DemoGauge = () => {
  const config = {
    width: 720,
    height: 720,
    autoFit: false,
    data: {
      value: {
        target: 120,
        total: 400,
        name: 'score',
      }
    }
    // data: {
    //   type: "fetch",
    //   value:
    //     "https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv",
    // },
    // xField: 'year',
    // yField: 'people',
    // meta: { y: { type: "sqrt" } },
    // transform: [{ type: "groupX", y: "sum" }],
    // axis: {
    //   y: {
    //     title: 'sum of people',
    //     labelFormatter: "~s",
    //     tickCount: 5,
    //     tickFilter: (d, i) => i !== 0,
    //     direction: "right",
    //   },
    // },
    // tooltip: { items: [{ channel: "y", valueFormatter: "~s" }] },
  };
  return <Gauge {...config} />;
};

ReactDOM.render(<DemoGauge />, document.getElementById('container'));
