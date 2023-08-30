import React from 'react';
import { GuageOptions } from '../../core';
import { CommonConfig } from '../../interface';
import { BaseChart } from '../base';

export type GuageConfig = CommonConfig<GuageOptions>;

const GuageChart = (props: GuageConfig) => <BaseChart {...props} chartType="Guage" />;

export default GuageChart;
