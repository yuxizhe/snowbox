import React, { useEffect, useRef } from 'react';

export type { SvgProps, PolylineProps, LineProps } from 'react-native-svg';

const Svg = ({ onLayout, ...props }: any) => {
  const svgRef = useRef();

  useEffect(() => {
    const { current = {} }: any = svgRef;
    if (onLayout) {
      onLayout({
        nativeEvent: {
          layout: {
            x: current.clientLeft,
            y: current.clientTop,
            width: current.clientWidth,
            height: current.clientHeight,
          },
        },
      });
    }
  }, []);

  return (
    <svg {...props} ref={svgRef}>
      {props.children}
    </svg>
  );
};

const Text = (props) => <text {...props}>{props.children}</text>;

const Line = (props) => <line {...props}>{props.children}</line>;

const Polyline = (props) => <polyline {...props}>{props.children}</polyline>;
const Path = ({ onPress, ...props }: any) => (
  <path {...props} onClick={props.onPress}>
    {props.children}
  </path>
);
const G = (props) => <g {...props}>{props.children}</g>;
const Circle = ({ onPress, ...props }: any) => (
  <circle {...props} onClick={props.onPress}>
    {props.children}
  </circle>
);
const Rect = (props) => <rect {...props}>{props.children}</rect>;

export { Svg, Text, Line, Polyline, Path, G, Circle, Rect };
