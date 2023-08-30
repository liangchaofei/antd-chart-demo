import { Guage } from '@ant-design/plots';
import React from 'react';
import ReactDOM from 'react-dom';

const DemoGuage = () => {
  const config = {
    width: 720,
    height: 720,
    autoFit: false,
    legend: false,
    data: {
      value: {
        target: 120,
        total: 400,
        name: 'score',
      }
    }
  };
  return <Guage {...config} />;
};

ReactDOM.render(<DemoGuage />, document.getElementById('container'));
