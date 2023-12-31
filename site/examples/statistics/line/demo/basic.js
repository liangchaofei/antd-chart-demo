import { Line } from '@ant-design/plots';
import React from 'react';
import ReactDOM from 'react-dom';

const DemoLine = () => {
  const config = {
    data: {
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json',
    },
    xField: 'Date',
    yField: 'scales',
    shape: 'smooth',
    style: {
      lineWidth: 2,
    },
    annotations: [
      {
        type: 'text',
        data: ['2014-03', 1834],
        style: {
          text: '2014-03, 受比特币影响，blockchain 1834',
          wordWrap: true,
          wordWrapWidth: 164,
          dx: -174,
          dy: 30,
          fill: '#2C3542',
          fillOpacity: 0.65,
          fontSize: 10,
          background: true,
          backgroundRadius: 2,
          connector: true,
          startMarker: true,
          startMarkerFill: '#2C3542',
          startMarkerFillOpacity: 0.65,
        },
        tooltip: false,
      },
    ],
  };
  return <Line {...config} />;
};

ReactDOM.render(<DemoLine />, document.getElementById('container'));
