import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Platform } from 'react-native';
import debounce from 'lodash.debounce';
import { Box, errorBoundary, formatDate, ActionSheet, PButton, THEME } from '..';
import style from './style';

/**
 * 滚动条件判断
 * 日期边界校准： 从 31 日变为 30，29，28日
 * 日期重新计算高度： 最小时间的日高度与其他日计算存在差异
 * 年滚动
 * 1、从其他/最大时间的年滚动到最小年，月需要变化，日需要变化 ✅
 * 2、从最小/大时间的年滚动到中间年，月不需要变化，日需要变化（平闰年）✅
 * 3、从其他/最小时间滚动到最大年，月需要变化，日需要变化 ✅
 * 月滚动
 * 1、最小时间的最小月滚动到其他月，日高度重新计算, 日期边界校准 ✅
 * 2、最小时间的其他月滚动到最小月，日高度重新计算，日期边界校准 ✅
 * 3、正常年的月滚动，日期边界校准 ✅
 * 4、最大时间的其他月份滚动到最大月，日期边界校准 ✅
 * 5、最大时间的最大月滚动到其他月份，日期边界校准 ✅
 */

/**
 * 滚动测试用例
 * 1、点进自定义时间，时间在当前日（最大时间），最大时间和最小时间取值正常  ✅
 * 滚动年（月，日都会受到影响，主要测试边界情况，涉及到月日高度的重新计算）
 * 1、滚动年，动画未结束不可滚动月日，结束可滚动月、日；月日与年交互相同 ✅
 * 2、滚动年，从最大时间年滚动到最小时间，若最大时间的月小于最小时间的月，则自动跳转到最小时间的月，若最大时间的日小于最小时间的日，则自动跳转到最小时间的日 ✅
 * 3、滚动年，从最大时间年滚动到中间时间，若闰年到平年，且月份为2日为29，则日跳转到28（闰年函数） ✅
 * 4、滚动年，从最小时间年滚动到最大时间，若最小时间的月大于最大时间的月，则自动跳转到最大时间的月，若最小时间的日大于最大时间的日，则自动跳转到最大时间的日 ✅
 * 5、滚动年，从最小时间年滚动到中间时间，若闰年到平年，且月份为2日为29，则日跳转到28（闰年函数） ✅
 * 6、滚动年，从中间时间年滚动到最大时间年，若最大时间的月小于中间时间的月，则自动跳转到最大时间的月，若最大时间的日小于中间时间的日，则自动跳转到最大时间的日 ✅
 * 7、滚动年，从中间时间年滚动到最小时间年，若最小时间的月大于中间时间的月，则自动跳转到最小时间的月，若最小时间的日大于中间时间的日，则自动跳转到最小时间的日 ✅
 * 滚动月（只有日会受到影响）
 * 1、滚动月，从大日数的月，滚动到小日数的月，（如从1月滚到2月，31日到28或29日）， 如果当前日大于要滚动月的天数，则自动跳转到要滚动月的最大日 ✅
 * 2、最小时间，从最小月滚动到其他月，展示正常 ✅
 * 3、最大时间，从最大月滚动到其他月，展示正常 ✅
 * 开始时间交互
 * 1、点击起始时间，若开始时间有值，则自动跳转到该时间 ✅
 * 2、点击起始时间，若开始时间无值，则自动赋予当前滚动的表示时间 ✅
 * 3、起始时间聚焦，滚动年月日，能够准确切换时间 ✅
 * 结束时间交互
 * 1、点击结束时间，若结束时间有值，则自动跳转到该时间 ✅
 * 2、点击结束时间，若结束时间无值，则自动赋予当前滚动的表示时间 ✅
 * 3、结束时间聚焦，滚动年月日，能够准确切换时间 ✅
 * 重置
 * 1、开始、结束时间清空，时间滚动到当前日  ✅
 * 确定
 * 1、开始、结束时间空校验 ✅
 * 2、结束时间大于开始时间 ✅
 */

const isWeb = Platform.OS === 'web';

type Props = {
  /**
   * 是否展示弹框
   */
  visible: boolean;
  /**
   * header 标题
   */
  headerTitle?: string;
  /**
   * header 右侧文字
   */
  headerRightText?: string;
  /**
   * header 左侧关闭按钮是否展示
   */
  showHeaderCloseIcon?: boolean;
  /**
   * 底部按钮文字
   */
  footer?: string;
  /**
   * 顶部提示文字
   */
  tip?: string;
  /**
   * 回调会在用户按下 Android 设备上的后退按键时触发
   */
  onRequestClose: () => void;
  /**
   * header 左侧交互
   */
  onCloseIconClick: () => void;
  /**
   * 底部按钮点击交互
   */
  onFooterClick: (inputStartTime: string, inputEndTime: string) => void;
  /**
   * 开始时间
   */
  startTime?: string;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 最小值日期
   */
  min?: Date;
  /**
   * 最大值日期
   */
  max?: Date;
};

const DatePicker = ({
  visible,
  headerTitle = '自定义时间段',
  headerRightText = '重置',
  showHeaderCloseIcon = true,
  footer = '确定',
  tip = '',
  onRequestClose,
  onCloseIconClick,
  onFooterClick,
  startTime = '2000-01-01',
  endTime,
  min = new Date('2000-01-01'),
  max = new Date(),
}: Props) => {
  const styles = style(THEME);
  const yearScrollViewRef = useRef(null);
  const monthScrollViewRef = useRef(null);
  const dayScrollViewRef = useRef(null);
  const [inputStartTime, setInputStartTime] = useState(startTime);
  const [inputEndTime, setInputEndTime] = useState(endTime || formatDate(new Date()));
  const [startTimeFocus, setStartTimeFocus] = useState(false);
  const [endTimeFocus, setEndTimeFocus] = useState(false);
  const [yearScrollEnabled, setYearScrollEnabled] = useState(true);
  const [monthScrollEnabled, setMonthScrollEnabled] = useState(true);
  const [dayScrollEnabled, setDayScrollEnabled] = useState(true);
  const [msgData, setMsgData] = useState({ msg: '', type: 0, timestamp: 0 });
  const [date, setDate] = useState(new Date());
  // 当前选择年
  const [year, setYear] = useState(date.getFullYear());
  // 当前选择月
  const [month, setMonth] = useState(date.getMonth() + 1);
  // 当前选择日
  const [day, setDay] = useState(date.getDate());
  // 最小日期
  const minDate = {
    year: min.getFullYear(),
    month: min.getMonth() + 1,
    day: min.getDate(),
  };
  // 最大日期
  const maxDate = {
    year: max.getFullYear(),
    month: max.getMonth() + 1,
    day: max.getDate(),
  };

  const MonthDay = {
    d31: [1, 3, 5, 7, 8, 10, 12],
    d30: [4, 6, 9, 11],
    d28: [2],
  };

  useEffect(() => {
    setMsgData({ msg: '', type: 0, timestamp: 0 });
    setTimeout(() => {
      scrollTimePicker(formatDate(date), false);
    }, 1);
  }, [visible]);

  useEffect(() => {
    handleScrollView('year', (year - minDate.year) * 48);
    if (year === minDate.year) {
      if (month === minDate.month) {
        handleScrollView('month', 0);
        handleScrollView('day', (day - minDate.day) * 48);
      } else {
        handleScrollView('month', (month - minDate.month) * 48);
        handleScrollView('day', (day - 1) * 48);
      }
    } else {
      handleScrollView('month', (month - 1) * 48);
      handleScrollView('day', (day - 1) * 48);
    }
  }, [year, month, day]);

  // 视图滚动到指定时间
  const scrollTimePicker = (t: string, animated = false) => {
    if (!t.length) {
      return;
    }
    const temp = t.split('-').map((it: string) => Number(it));
    setYear(temp[0]);
    setMonth(temp[1]);
    setDay(temp[2]);
    const yearY = (temp[0] - minDate.year) * 48;
    let monthY = (temp[1] - 1) * 48;
    let dayY = (temp[2] - 1) * 48;
    // console.log('scrollTimePicker', 't', t);
    // console.log('temp===>', temp, yearY, monthY, dayY);
    if (temp[0] === minDate.year) {
      monthY = (temp[1] - minDate.month) * 48;
      if (temp[1] === minDate.month) {
        dayY = (temp[2] - minDate.day) * 48;
      }
    }
    handleScrollView('year', yearY, animated);
    handleScrollView('month', monthY, animated);
    handleScrollView('day', dayY, animated);
  };

  // 滚动
  const handleScrollView = (time, scrollY, isAnimated = false) => {
    const obj = { y: scrollY, animated: isAnimated };
    const scroll = {
      year: () => yearScrollViewRef.current?.scrollTo(obj),
      month: () => monthScrollViewRef.current?.scrollTo(obj),
      day: () => dayScrollViewRef.current?.scrollTo(obj),
    };
    scroll[time]();
  };

  // 是否闰年
  const isRunYear = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

  // 计算当前月天数，改动的月的天数
  const computedMonthDay = (currentMonth, changeMonth, y) => {
    let currentMonthDay = 0;
    let willChangeMonthDay = 0;
    if (MonthDay.d31.includes(currentMonth)) {
      currentMonthDay = 31;
    }
    if (MonthDay.d31.includes(changeMonth)) {
      willChangeMonthDay = 31;
    }
    if (MonthDay.d30.includes(currentMonth)) {
      currentMonthDay = 30;
    }
    if (MonthDay.d30.includes(changeMonth)) {
      willChangeMonthDay = 30;
    }
    if (MonthDay.d28.includes(currentMonth)) {
      if (isRunYear(y)) {
        currentMonthDay = 29;
      } else {
        currentMonthDay = 28;
      }
    }
    if (MonthDay.d28.includes(changeMonth)) {
      if (isRunYear(y)) {
        willChangeMonthDay = 29;
      } else {
        willChangeMonthDay = 28;
      }
    }
    return { currentMonthDay, willChangeMonthDay };
  };

  // 滚动停止
  const endScrollHandle = (e, type) => {
    const getNum = (val: number) => (val < 10 ? `0${val.toString()}` : val.toString());
    // new Date('YYYY-MM-DD') 必须传 YYYY-MM-DD格式
    let y = e.nativeEvent.contentOffset?.y.toFixed(0);
    const remiander = y % 48;
    if (remiander < 24) {
      y -= remiander;
    } else {
      y = y - remiander + 48;
    }
    let temp: Array<string> = [];
    temp = [
      `${year}`,
      month.toString().length > 1 ? month.toString() : `0${month}`,
      day.toString().length > 1 ? day.toString() : `0${day}`,
    ];
    // 记录滚动后的时间
    let yearTemp = year;
    let monthTemp = month;
    let dayTemp = day;
    if (type === 'year') {
      if (y === 0) {
        yearTemp = minDate[type];
      } else {
        yearTemp = minDate[type] + y / 48;
      }
      temp[0] = yearTemp.toString();
      const cs = checkScrollStatus({ yearTemp, monthTemp, dayTemp }, 'year');
      setYear(yearTemp);
      temp[1] = getNum(cs.monthTemp);
      temp[2] = getNum(cs.dayTemp);
    }

    if (type === 'month') {
      let addNum = 0;
      if (year === minDate.year) {
        addNum = minDate.month - 1;
      }
      if (y === 0) {
        monthTemp = 1 + addNum;
      } else {
        monthTemp = y / 48 + 1 + addNum;
      }
      setMonth(monthTemp);
      temp[1] = getNum(monthTemp);
      const cs = checkScrollStatus({ yearTemp, monthTemp, dayTemp }, 'month');
      temp[2] = getNum(cs.dayTemp);
    }

    if (type === 'day') {
      dayTemp = y / 48 + 1;
      if (year === minDate.year && month === minDate.month) {
        dayTemp = dayTemp + minDate.day - 1;
      }
      temp[2] = getNum(dayTemp);
      setDay(dayTemp);
    }
    onChange(new Date(temp.join('-')));
  };

  const onChange = (d: Date) => {
    if (startTimeFocus) {
      setInputStartTime(formatDate(d));
    }
    if (endTimeFocus) {
      setInputEndTime(formatDate(d));
    }
    setDate(d);
    isWeb && scrollTimePicker(formatDate(d), false);
  };

  // 边界滚动无数值处理
  const checkScrollStatus = (temp, s) => {
    /**
     * 不论滚动哪一个时间，保证其他时间切换展示在当前时间的区间内
     * 年，月（最小年、最大年限制），日（月限制，平闰年限制）
     * 操作：1、滚到顶 2、滚到底
     * 1、滚年
     *    * 从边界往内滚，月不受影响，日受影响
     *    * 从内往边界滚，月受影响，日受影响
     *    * 闰年到平年，日受影响
     * 2、滚月
     *    * 年不受影响，日受影响，底部边界
     * 3、滚日
     *    * 年月不受影响
     */
    const dAdjust = (d) => {
      setDay(d);
      temp.dayTemp = d;
    };
    const mAdjust = (m) => {
      setMonth(m);
      temp.monthTemp = m;
    };
    if (s === 'year') {
      // 1、从其他时间的年滚动到最小年，月需要变化，日需要变化
      // 往最小年滚：当前年 > 最小年 && 修改年 === 最小年
      if (year > minDate.year && temp.yearTemp === minDate.year) {
        const cMonthDay = computedMonthDay(month, month, temp.yearTemp);
        if (month < minDate.month) {
          // 月改为最小时间的最小月，日期高度重新计算
          mAdjust(minDate.month);
        }
        // 当前日不在最小时间的范围内，小于最小时间的日
        if (day < minDate.day) {
          dAdjust(minDate.day);
        }
        // 大于变化月的最大日, 设置为最小时间的最大日
        if (day > cMonthDay.willChangeMonthDay) {
          dAdjust(cMonthDay.willChangeMonthDay);
        }
      }
      // 2、从最小/大时间的年滚动到中间年，月不需要变化，日需要变化（平润年）
      if (
        (year === minDate.year || year === maxDate.year) &&
        temp.yearTemp > minDate.year &&
        temp.yearTemp < maxDate.year
      ) {
        const cMonthDay = computedMonthDay(month, month, temp.yearTemp);
        // 大于变化月的最大日
        if (day > cMonthDay.willChangeMonthDay) {
          dAdjust(cMonthDay.willChangeMonthDay);
        }
      }
      // 3、从其他时间滚动到最大年，月需要变化，日需要变化
      if (year < maxDate.year && temp.yearTemp === maxDate.year) {
        // 大于变化月的最大日
        if (month > maxDate.month) {
          // 月改为最小时间的最小月，日期高度重新计算
          mAdjust(maxDate.month);
        } else {
          mAdjust(month);
        }
        // 当前日大于最大时间的最大日
        if (day > maxDate.day) {
          dAdjust(maxDate.day);
        }
      }
      // 4、闰年滚平年 2月29日 变 2月28日
      if (isRunYear(year) && !isRunYear(temp.yearTemp) && month === 2 && day === 29) {
        dAdjust(28);
      }
    }
    if (s === 'month') {
      // 1、最小时间的最小月滚动到其他月，日高度重新计算, 日期边界校准
      const cMonthDay = computedMonthDay(month, temp.monthTemp, year);
      if (year === minDate.year && month === minDate.month && temp.monthTemp > minDate.month) {
        // 大于变化月的最大日
        if (day > cMonthDay.willChangeMonthDay) {
          dAdjust(cMonthDay.willChangeMonthDay);
        } else {
          dAdjust(day);
        }
      }
      // 2、最小时间的其他月滚动到最小月，日高度重新计算，日期边界校准
      if (year === minDate.year && month > minDate.month && temp.monthTemp === minDate.month) {
        if (day < minDate.day) {
          dAdjust(minDate.day);
        }
        if (day > cMonthDay.willChangeMonthDay) {
          dAdjust(cMonthDay.willChangeMonthDay);
        }
      }
      // 3、正常年的月滚动，日期边界校准
      // 非两端值
      if (
        (year === minDate.year && month !== minDate.month && temp.monthTemp !== minDate.month) ||
        (year === maxDate.year && month !== maxDate.month && temp.monthTemp !== maxDate.month) ||
        (year > minDate.year && year < maxDate.year)
      ) {
        if (day > cMonthDay.willChangeMonthDay) {
          dAdjust(cMonthDay.willChangeMonthDay);
        }
      }
      // 4、最大时间的其他月份滚动到最大月，日期边界校准
      if (year === maxDate.year && month < maxDate.month && temp.monthTemp === maxDate.month) {
        if (day > maxDate.day) {
          dAdjust(maxDate.day);
        }
      }
      // 5、最大时间的最大月滚动到其他月份，日期边界校准
      if (year === maxDate.year && month === maxDate.month && temp.monthTemp < maxDate.month) {
        if (day > cMonthDay.willChangeMonthDay) {
          dAdjust(cMonthDay.willChangeMonthDay);
        }
      }
    }

    return temp;
  };

  const debounceScroll = debounce(endScrollHandle, 100);

  // 年选择
  const yearSvRender = () => {
    const temp: Array<number> = [];
    const minYear = minDate.year;
    const maxYear = maxDate.year;
    for (let a = 0; a <= maxYear - minYear; a += 1) {
      temp.push(minYear + a);
    }
    return (
      <Box h={144} w={105} noAuto>
        <View style={styles.hightLightSpace} />
        <ScrollView
          ref={yearScrollViewRef}
          onScroll={(e) => isWeb && debounceScroll(e, 'year')}
          style={{ height: 144 }}
          scrollEventThrottle={16}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          snapToInterval={48}
          scrollEnabled={yearScrollEnabled}
          onScrollBeginDrag={() => {
            setMonthScrollEnabled(false);
            setDayScrollEnabled(false);
          }}
          onMomentumScrollEnd={(e) => {
            endScrollHandle(e, 'year');
            setMonthScrollEnabled(true);
            setDayScrollEnabled(true);
          }}
        >
          <Box noAuto h={48} />
          {temp.map((it: number, index: number) => (
            <Box c noAuto h={48} f={18} key={`${index}year`}>
              {it}
            </Box>
          ))}
          <Box noAuto h={48} />
        </ScrollView>
      </Box>
    );
  };

  // 月选择
  const monthSvRender = () => {
    const temp: Array<number> = [];
    let minMonth = 1;
    let maxMonth = 12;
    // 当前选择年等于成立日年
    if (year === minDate.year) {
      minMonth = minDate.month;
    }
    // 当前选择年等于当前年
    if (year === maxDate.year) {
      maxMonth = maxDate.month;
    }
    for (let a = 0; a <= maxMonth - minMonth; a += 1) {
      temp.push(minMonth + a);
    }
    return (
      <Box h={144} w={105} noAuto>
        <View style={styles.hightLightSpace} />
        <ScrollView
          style={{ height: 144 }}
          ref={monthScrollViewRef}
          onScroll={(e) => isWeb && debounceScroll(e, 'month')}
          scrollEventThrottle={16}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          snapToInterval={48}
          scrollEnabled={monthScrollEnabled}
          onScrollBeginDrag={() => {
            setYearScrollEnabled(false);
            setDayScrollEnabled(false);
          }}
          onMomentumScrollEnd={(e) => {
            endScrollHandle(e, 'month');
            setYearScrollEnabled(true);
            setDayScrollEnabled(true);
          }}
        >
          <Box noAuto h={48} />
          {temp.map((it: number, index: number) => (
            <Box c noAuto h={48} f={18} key={`${index}month`}>
              {it}
            </Box>
          ))}
          <Box noAuto h={48} />
        </ScrollView>
      </Box>
    );
  };

  // 日选择
  const daySvRender = () => {
    const temp: Array<number> = [];
    let minDay = 1;
    let maxDay = 0;
    if (MonthDay.d31.includes(month)) {
      maxDay = 31;
    }
    if (MonthDay.d30.includes(month)) {
      maxDay = 30;
    }
    if (MonthDay.d28.includes(month)) {
      if (isRunYear(year)) {
        maxDay = 29;
      } else {
        maxDay = 28;
      }
    }
    if (year === minDate.year && month === minDate.month) {
      minDay = minDate.day;
    }
    if (year === maxDate.year && month === maxDate.month) {
      maxDay = maxDate.day;
    }
    for (let a = 0; a <= maxDay - minDay; a += 1) {
      temp.push(minDay + a);
    }
    return (
      <Box h={144} w={105} noAuto>
        <View style={styles.hightLightSpace} />
        <ScrollView
          style={{ height: 144 }}
          ref={dayScrollViewRef}
          onScroll={(e) => isWeb && debounceScroll(e, 'day')}
          alwaysBounceVertical={false}
          scrollEventThrottle={16}
          snapToInterval={48}
          showsVerticalScrollIndicator={false}
          scrollEnabled={dayScrollEnabled}
          onScrollBeginDrag={() => {
            setYearScrollEnabled(false);
            setMonthScrollEnabled(false);
          }}
          onMomentumScrollEnd={(e) => {
            endScrollHandle(e, 'day');
            setYearScrollEnabled(true);
            setMonthScrollEnabled(true);
          }}
        >
          <Box noAuto h={48} />
          {temp.map((it: number, index: number) => (
            <Box c noAuto h={48} f={18} key={`${index}day`}>
              {it}
            </Box>
          ))}
          <Box noAuto h={48} />
        </ScrollView>
      </Box>
    );
  };

  const inputRender = () => (
    <>
      <PButton
        p={0}
        br={4}
        onPress={() => {
          setStartTimeFocus(true);
          setEndTimeFocus(false);
          if (inputStartTime) {
            setDate(new Date(inputStartTime));
            scrollTimePicker(inputStartTime, false);
          } else {
            setInputStartTime(formatDate(date));
          }
        }}
        style={[startTimeFocus ? styles.btnFocus : styles.btnUnFocus]}
      >
        <Box h={34} cl="Blu010" w={132} style={[styles.item]}>
          {inputStartTime ? (
            <Box cl={startTimeFocus ? 'Blu010' : 'T010'}>{inputStartTime}</Box>
          ) : (
            <Box cl="T030">选择开始日期</Box>
          )}
        </Box>
      </PButton>
      <Box cl="T020">至</Box>
      <PButton
        p={0}
        br={4}
        onPress={() => {
          setStartTimeFocus(false);
          setEndTimeFocus(true);
          if (inputEndTime) {
            setDate(new Date(inputEndTime));
            scrollTimePicker(inputEndTime, false);
          } else {
            setInputEndTime(formatDate(date));
          }
        }}
        style={[endTimeFocus ? styles.btnFocus : styles.btnUnFocus]}
      >
        <Box h={34} cl="Blu010" w={132} style={[styles.item]}>
          {inputEndTime ? (
            <Box cl={endTimeFocus ? 'Blu010' : 'T010'}>{inputEndTime}</Box>
          ) : (
            <Box cl="T030">选择结束日期</Box>
          )}
        </Box>
      </PButton>
    </>
  );

  // 确认
  const handleConfirm = () => {
    const timestamp = new Date().getTime();
    if (!inputStartTime) {
      setMsgData({ msg: '请选择开始日期', type: 2, timestamp });
      return;
    }
    if (!inputEndTime) {
      setMsgData({ msg: '请选择结束日期', type: 2, timestamp });
      return;
    }
    if (new Date(inputStartTime).getTime() >= new Date(inputEndTime).getTime()) {
      setMsgData({ msg: '结束日期必须大于开始日期', type: 2, timestamp });
      return;
    }
    onFooterClick(inputStartTime, inputEndTime);
  };

  // 重置
  const handleReset = () => {
    setInputStartTime('');
    setInputEndTime('');
    setEndTimeFocus(false);
    setStartTimeFocus(false);
    setDate(new Date());
    scrollTimePicker(formatDate(new Date()), false);
  };

  return (
    <ActionSheet
      visible={visible}
      onRequestClose={onRequestClose}
      headerTitle={headerTitle}
      headerRightText={headerRightText}
      showHeaderCloseIcon={showHeaderCloseIcon}
      showHideAnimation={false}
      onCloseIconClick={onCloseIconClick}
      onHeaderRightClick={handleReset}
      footer={footer}
      onFooterClick={handleConfirm}
      bounces={false}
      // @ts-ignore
      msgData={msgData}
      content={
        <Box col flex={1}>
          <Box f={12} cl="T020" mb={8} style={tip === '' && styles.displayNone}>
            {tip}
          </Box>
          <Box style={styles.textWrap} mb={8}>
            {inputRender()}
          </Box>
          <Box
            noAuto
            h={168}
            py={12}
            c
            style={{
              overflow: 'hidden',
              justifyContent: 'space-between',
            }}
          >
            {yearSvRender()}
            {monthSvRender()}
            {daySvRender()}
          </Box>
        </Box>
      }
    />
  );
};

export default errorBoundary(DatePicker);
