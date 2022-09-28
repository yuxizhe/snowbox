import React from 'react';
import { Box, Txt, TxtNum } from '..';

interface contentProps {
  /**
   * 底部进度文案
   */
  baseText: string;
  /**
   * 底部容器 props，同 Box props
   */
  boxProps?: object;
  /**
   * 进度左侧描述
   */
  leftText?: string;
  /**
   * 进度左侧时间点
   */
  leftTime?: string;
  /**
   * 左侧描述 props，同`Box` props
   */
  leftTextProps?: object;
  /**
   * 左侧时间点 props，同`Box` props
   */
  leftTimeProps?: object;
  /**
   * 进度右侧描述
   */
  rightText?: string;
  /**
   * 进度右侧时间点
   */
  rightTime?: string;
  /**
   * 右侧描述 props，同`Box` props
   */
  rightTextProps?: object;
  /**
   * 右侧时间点 props，同`Box` props
   */
  rightTimeProps?: object;
}

interface TimeAxisPrps {
  /**
   * 时间轴列表
   */
  contentList: contentProps[];
  /**
   * 内容高度
   */
  contentHeight?: number;
}

const TimeAxis: React.FC<TimeAxisPrps> = ({ contentList = [], contentHeight = 90 }) => (
  <Box my={12}>
    <Box h={contentHeight} w={0.5} bg="L010" />
    {contentList.map((content, index) => (
      <>
        <Box
          key={`box-${index}`}
          h={contentHeight}
          col
          style={{ justifyContent: 'space-between' }}
          {...content.boxProps}
        >
          <Box px={4}>
            {(!!content.leftText || !!content.leftTime) && (
              <Box col flex={1}>
                <Box fw="500" mb={2} {...content.leftTextProps}>
                  {content.leftText}
                </Box>
                <Box DIN f={12} {...content.leftTimeProps}>
                  {content.leftTime}
                </Box>
              </Box>
            )}
            {(!!content.rightText || !!content.rightTime) && (
              <Box col flex={1} style={{ alignItems: 'flex-end' }}>
                <Box fw="500" mb={2} {...content.rightTextProps}>
                  {content.rightText}
                </Box>
                <Box DIN f={12} fw="500" cl="T020" {...content.rightTimeProps}>
                  {content.rightTime}
                </Box>
              </Box>
            )}
          </Box>
          <Box h={24} bg="Blu011" c>
            <TxtNum textProps={{ f: 12, cl: 'Blu010' }} numProps={{ f: 12, cl: 'Blu010', DIN: true }}>
              {content.baseText}
            </TxtNum>
          </Box>
        </Box>
        <Box key={`line-${index}`} h={contentHeight} w={0.5} bg="L010" />
      </>
    ))}
  </Box>
);

export default TimeAxis;

// dumi api导出
export const contentProps = (props: contentProps) => <></>;
