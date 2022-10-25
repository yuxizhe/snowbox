import { ShadowDirectionType } from './constant';

export type DataItemProps = {
  date: string;
  rate: number | string;
  originRate?: number | string;
  // 是否有业绩归因
  performance_attribution?: any;
  // 买点
  buy?: any;
  // 埋点
  sell?: any;
};

export type ChartProps = {
  /**
   * 曲线数据，二维数组
   */
  data: DataItemProps[][];
  width?: number;
  height?: number;
  /**
   * 阴影方向
   */
  shadowDirection?: ShadowDirectionType;
  /**
   * 曲线颜色数组 跟data一一对应
   */
  color?: string[];
  /**
   * 阴影填充色数组
   */
  fill?: string[];
  /**
   * 触摸移动回调
   * x为 index 代表第几个数据
   */
  onMoveHandler?: (params: { x: number; y: number }) => void;
  /**
   * 当前选中了哪个业绩归因tag 值为 data数据中的index
   */
  selectTag?: number[];
  /**
   * 点击其他业绩归因回调 回传index
   */
  tagClick?: (index: number) => void;
  /**
   * 展示暂无数据时回调
   */
  noDataCallBack?: (nodata: boolean) => void;
  /**
   * y轴坐标是否含有百分号
   */
  hasLabelPercent?: boolean;
  /**
   * 横屏模式 只支持web
   */
  isLandscape?: boolean;
  /**
   * 横屏模式宽高，默认屏幕宽高
   */
  landScapeWidth?: number;
  landScapeHeight?: number;
  landScapePadding?: number;
  /*
   * 用户是否正在触摸, 可用来禁止外层ScrollView滚动
   */
  isUserTouch?: (is: boolean) => void;
};
