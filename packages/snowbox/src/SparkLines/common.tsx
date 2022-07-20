import { AxisProps } from './props';

export class DataToPoints {
  /* 所有数据 */
  all_data: AxisProps[] = [];

  /* 传入宽度 */
  width: number = 100;

  /* 传入高度 */
  height: number = 100;

  /* 传入最大值 */
  max: number = 0;

  /* 传入最小值 */
  min: number = -1;

  /* 打点距离 */
  x_tick: number = 0;

  /* 最大值 */
  Y_max: number = 0;

  /* 最小值 */
  Y_min: number = 0;

  /* 图表高度与数据值差比例 */
  radio: number = 1;

  /* 记录所有数据的index */
  x_index_map: any = {};

  constructor(props) {
    const { all_data, width, height, max = 0, min = 0 } = props;

    this.all_data = all_data;
    this.width = width;
    this.height = height;
    this.max = max;
    this.min = min;

    this.init();
  }

  init() {
    // 时间排序
    const x_sort_data = [...new Set(this.all_data.map((e: AxisProps) => e.date))].sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    );

    // 记录x每个时间的index
    x_sort_data.forEach((e, index) => {
      this.x_index_map[e] = index;
    });

    // 宽高
    const SVGwidth = Number(this.width);
    const SVGheight = Number(this.height);

    // 两点之间的距离
    this.x_tick = Number((SVGwidth / (x_sort_data.length + 1)).toFixed(2));

    // Y轴最大最小值
    this.Y_max = this.max || Math.max(...this.all_data.map((e) => +e.rate));
    this.Y_min = this.min || Math.min(...this.all_data.map((e) => +e.rate));

    const diff_value = this.Y_max - this.Y_min;

    this.radio = Number((SVGheight / diff_value).toFixed(2));
  }

  /* 获取数据在svg区域的打点 */
  toPoints(data: AxisProps[]) {
    const tempData = data.sort((a: AxisProps, b: AxisProps) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const result: any = [];
    tempData.forEach((e: AxisProps) => {
      const ind = this.x_index_map[e.date];
      const x_y_date = [(ind * this.x_tick).toFixed(2), ((this.Y_max - +e.rate) * this.radio).toFixed(2)].join(',');
      result.push(x_y_date);
    });
    return result.join(' ');
  }

  /* 获取点在y轴的位置 */
  getYPoint(data: string | number) {
    return ((this.Y_max - +data) * this.radio).toFixed(2);
  }
}

const defaultPoliLineStyle = {
  0: {
    stroke: '#F54346',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  1: {
    stroke: '#AAAAAA',
    strokeWidth: 1,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
};

export const getDefaultPLProps = (ind: string | number) =>
  defaultPoliLineStyle[ind] || { stroke: '#333333', strokeWidth: 1, strokeLinecap: 'round', strokeLinejoin: 'round' };
