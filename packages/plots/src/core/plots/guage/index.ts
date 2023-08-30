import { Plot } from '../../base';
import type { Adaptor } from '../../types';
import { adaptor } from './adaptor';
import { GuageOptions } from './type';

export type { GuageOptions };

export class Guage extends Plot<GuageOptions> {
  /** 图表类型 */
  public type = 'guage';

  /**
   * 获取 仪表盘 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<GuageOptions> {
    return { type: 'view', children: [{ type: 'guage' }] };
  }

  /**
   * 获取 仪表盘 默认配置
   */
  protected getDefaultOptions() {
    return Guage.getDefaultOptions();
  }

  /**
   * 仪表盘适配器
   */
  protected getSchemaAdaptor(): (params: Adaptor<GuageOptions>) => void {
    return adaptor;
  }
}
