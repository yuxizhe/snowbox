import React from 'react';
import { Box, Txt, TxtNum } from '..';

interface contentProps {
  baseText: string;
  leftText?: string;
  leftTime?: string;
  rightText?: string;
  rightTime?: string;
  boxProps?: object;
  leftTextProps?: object;
  leftTimeProps?: object;
  rightTextProps?: object;
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
