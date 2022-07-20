import { PolylineProps, LineProps } from '../Svg';

export type SparkLineType = 'polyline' | 'baseline';

export interface ProtoTypeProps {
  polyline?: PolylineProps;
  baseline?: LineProps;
}

export interface AxisProps {
  date: string | number;
  rate: string | number;
}

export interface Config {
  type: SparkLineType;
  sourcedata?: AxisProps[];
  benchmarkpoint?: string | number;
  props?: ProtoTypeProps[SparkLineType];
}

export interface SparkLinesProps {
  config?: Config[];
  data?: AxisProps[][];
  max?: number;
  min?: number;
}
