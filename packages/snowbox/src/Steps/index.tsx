import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Icon, TxtNum } from '../';
import { getSize } from '../Utils';
import { boxTypes } from '../Utils/props';

type StepTypes = 'success' | 'fail' | 'waiting' | 'stay';

interface IStep {
  name: string;
  desc?: string | React.ReactElement;
  status: StepTypes;
}

interface Props extends boxTypes {
  /**
   * 数据
   */
  data: Array<IStep>;
}

/**
 * Steps
 */
function Steps({ data, ...boxProps }: Props) {
  const statusIcon = (status: StepTypes) => {
    switch (status) {
      case 'stay':
        return <Box w={8} h={8} bg="T040" br={4} />;
      case 'waiting':
        return (
          <Box w={18} h={18} br={9} bc="Blu010" bw={1} c>
            <Box w={2} h={2} br={9} bg="Blu010"></Box>
            <Box mx={2} w={2} h={2} br={1} bg="Blu010"></Box>
            <Box w={2} h={2} br={1} bg="Blu010"></Box>
          </Box>
        );
      case 'success':
        return (
          <Box w={18} h={18} bg="Blu010" br={9} c>
            <Icon w={10} h={7} type="icon_s_whiteHook"></Icon>
          </Box>
        );
      case 'fail':
        return (
          <Box w={18} h={18} bg="Red010" br={9} col style={{ alignItems: 'center' }} c>
            <Box w={2} h={7} br={10} bg="T060"></Box>
            <Box mt={1} w={2} h={2} br={1} bg="T060"></Box>
          </Box>
        );
      default:
        return <Box w={8} h={8} bg="T040" br={4} />;
    }
  };

  return (
    <Box mt={8} p={12} bg="B020" br={8} {...boxProps}>
      <Box w="100%" col>
        {data.map((item, index) => {
          const content = item.desc ? (
            React.isValidElement(item.desc) ? (
              <Box>{item.desc}</Box>
            ) : (
              <TxtNum textProps={{ cl: 'T030', f: 12 }} numProps={{ cl: 'T030', f: 12, DIN: true }}>
                {item.desc as string}
              </TxtNum>
            )
          ) : null;
          return (
            <Box key={index} style={styles.flexStart}>
              {index < data.length - 1 ? (
                <Box ab t={0} l={8.5} w={1} h="100%" bg={item.status === 'success' ? 'Blu010' : 'L010'} />
              ) : null}
              <Box mr={8} w={18} h={22} bg="B020" br={11} bc="B020" c style={styles.progressIconWrapper}>
                {statusIcon(item.status)}
              </Box>
              <Box flex={1} col pb={index < data.length - 1 ? 24 : 0}>
                <Box>
                  <TxtNum textProps={{ cl: 'T010', f: 16 }} numProps={{ cl: 'T010', f: 16, DIN: true }}>
                    {item.name}
                  </TxtNum>
                </Box>
                {content}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  flexStart: {
    alignItems: 'flex-start',
  },
  progressIconWrapper: {
    borderTopWidth: getSize(2) as number,
    borderBottomWidth: getSize(2) as number,
  },
});

export default Steps;
