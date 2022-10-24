import React, { useState } from 'react';
import {
  Box,
  PButton,
  Press,
  Tabs,
  Icon,
  Modal,
  Txt,
  TxtNum,
  Progress,
  Radio,
  Checkbox,
  Swiper,
  Loading,
  Button,
  Tag,
  Badge,
  Card,
  DatePicker,
  Empty,
  Img,
  NoticeBar,
  Popup,
  Observer,
  PieChart,
  ThemeColor,
  SVG,
  Countdown,
} from 'snowbox';
// import Toast from '@/components/Toast';
import ActionSheets from './ActionSheets';
import SparkLineDemo from './SparkLineDemo';
import ContrastBarDemo from './ContrastDemo';
import StackedBarDemo from './StackedBarDemo';

const { IOScrollView, InView } = Observer;
const { Text: SVGText } = SVG;

const Product = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <IOScrollView>
      <Box col bg="B010">
        <Box col m={10} p={10} br={10} bg="B020">
          <Box f={20} mb={10} cl="T010" DIN>
            Box
          </Box>
          <Box bg="Blu011">
            <Box m={20} p={20} flex={1} bg="Blu014" bw={1} bc="Blu010">
              <Box c h={50} bg="Blu010" w="100%" DIN>
                Box 盒子模型
              </Box>
            </Box>
            <Box ab t={0} l="47%" cl="T040">
              mt
            </Box>
            <Box ab t={20} l="47%" cl="T030">
              pt
            </Box>
            <Box ab b={0} l="47%" cl="T040">
              mb
            </Box>
            <Box ab b={20} l="47%" cl="T030">
              pb
            </Box>
            <Box ab l={2} t={55} cl="T040">
              ml
            </Box>
            <Box ab l={23} t={55} cl="T030">
              pl
            </Box>
            <Box ab r={2} t={55} cl="T040">
              mr
            </Box>
            <Box ab r={23} t={55} cl="T030">
              pr
            </Box>
          </Box>
          <Box m={5} cl="T020" DIN>
            w: width . h: height . p: padding . m: margin
          </Box>
          <Box m={5} cl="T020" DIN>
            c: center 居中 . col: 竖排列 . flex: 弹性
          </Box>
          <Box m={5} cl="T020" DIN>
            margin: m . mx . my . mt . mr . ml . mb
          </Box>
          <Box m={5} cl="T020" DIN>
            padding: p . px . py . pt . pr . pl . pb
          </Box>
          <Box m={5} cl="T020" DIN>
            border: br:borderRadius . bw:widht . bc:color
          </Box>

          <Box mt={10} DIN cl="T020">
            默认自动屏幕适配
          </Box>
          <Box>
            <Box c w={300} h={50} bg="Blu011" f={20} fw="800" br={5} DIN>
              300*50
            </Box>
          </Box>
          <Box mt={10} DIN cl="T020">
            noAuto: 不进行屏幕适配
          </Box>
          <Box>
            <Box c w={300} h={50} bg="Blu011" f={20} fw="800" br={5} DIN noAuto>
              300*50
            </Box>
          </Box>
        </Box>
        <Box col m={10} p={10} br={10} bg="B020">
          <Box f={20} mb={10} cl="T010" DIN>
            Txt 文字
          </Box>
          <Box m={5} cl="T020" DIN>
            f: fontSize . fw: fontWeight . lh: lineHeight . cl: color
          </Box>
          <Box>
            <Box DIN f={18}>
              {18}
            </Box>
            <Box DIN f={16}>
              .16.
            </Box>
            <Txt DIN f={14}>
              14.
            </Txt>
            <Txt DIN f={12}>
              12.
            </Txt>
            <Txt DIN f={10}>
              10.
            </Txt>
            <Box ml={10} DIN f={14} fw="bold">
              bold.
            </Box>
            <Txt DIN f={14} fw="500">
              500.
            </Txt>
            <Txt DIN f={14} fw="400">
              400.
            </Txt>
            <Box ml={10} DIN cl="Gld010">
              Gld010.
            </Box>
            <Txt DIN cl="Grn010">
              Grn010.
            </Txt>
            <Txt DIN cl="Org010">
              Org010.
            </Txt>
          </Box>
        </Box>
        <Box col m={10} p={10} br={10} bg="B020">
          <Box f={20} mb={10} cl="T010" DIN>
            TxtNum 文字
          </Box>
          <Box m={5} cl="T020" DIN>
            功能：在Txt组件的基础上，新增numProps、textProps属性分别设置数字和其他文本的样式
          </Box>
          <Box m={5}>
            <TxtNum
              textProps={{ cl: 'Red010', fw: '600', f: 12 }}
              numProps={{ cl: 'Blu010', fw: '500', f: 15, DIN: true }}
            >
              例如：富国沪深300增强。今年以来 +12.90%,，收益-223,133.88。 汉字是红色、字重600、字号12,
              数字蓝色、字重500、字号15、字体DIN
            </TxtNum>
          </Box>
        </Box>
        <Box col m={10} p={10} br={10} bg="B020">
          <Box f={20} mb={10} cl="T010" DIN>
            颜色
          </Box>
          <Box m={5} cl="T020" DIN>
            cl: color . bg: backgroundColor
          </Box>
          <Box>
            <Box c m={5} w={50} cl="T010" DIN>
              T010
            </Box>
            <Box c m={5} w={50} cl="T020" DIN>
              T020
            </Box>
            <Box c m={5} w={50} cl="T030" DIN>
              T030
            </Box>
            <Box c m={5} w={50} cl="T070" DIN>
              T070
            </Box>
            <Box c m={5} w={50} cl="T080" DIN>
              T080
            </Box>
          </Box>
          <Box>
            <Box c m={5} w={50} h={50} bg="Blu010" DIN>
              Blu010
            </Box>
            <Box c m={5} w={50} h={50} bg="Blu011" DIN>
              Blu011
            </Box>
            <Box c m={5} w={50} h={50} bg="Blu014" DIN>
              Blu014
            </Box>
            <Box c m={5} w={50} h={50} bg="Blu015" DIN>
              Blu015
            </Box>
            <Box c m={5} w={50} h={50} bg="Blu016" DIN>
              Blu016
            </Box>
          </Box>
          <Box>
            <Box c col m={5} w={50} h={50} bg="B020">
              <Box c cl="T040" DIN>
                T040
              </Box>
              <Box c cl="T010" DIN>
                B020
              </Box>
            </Box>
            <Box c col m={5} w={50} h={50} bg="B010">
              <Box c cl="T060" DIN>
                T060
              </Box>
              <Box c cl="T060" DIN>
                B010
              </Box>
            </Box>
            <Box c m={5} w={50} h={50} bg="B030">
              <Txt cl="T070" DIN>
                T070
              </Txt>
            </Box>
            <Box c m={5} w={50} h={50} bg="B040">
              <Txt cl="T080" DIN>
                T080
              </Txt>
            </Box>
            <Box c m={5} w={50} h={50} bg="B020">
              <Txt cl="Gld010" DIN>
                Gld010
              </Txt>
            </Box>
          </Box>
        </Box>
        <Box col m={10} p={10} br={10} bg="B020" h={160}>
          <Box f={20} cl="T010" DIN>
            定位
          </Box>
          <Box m={5} cl="T020" DIN>
            ab: 绝对定位 . l: left . r: right . t: top . b: bottom
          </Box>
          <Box col mt={10}>
            <Box w={50} h={50} bg="Blu010" />
            <Box ab l={10} t={10} w={50} h={50} bg="Blu014" />
            <Box ab l={20} t={20} w={50} h={50} bg="Blu011" />
          </Box>
        </Box>
        <Box col m={10} p={10} br={10} bg="B020">
          <Box f={20} mb={10} cl="T010" DIN>
            Icon
          </Box>
          <Box m={5}>
            <Icon type="icon_s_explain_linear" />
            <Box ml={10} cl="T020">
              icon_s_explain_linear
            </Box>
          </Box>
          <Box m={5}>
            <Icon type="icon_s_unfold" />
            <Box ml={10} cl="T020">
              icon_s_unfold
            </Box>
          </Box>
          <Box m={5}>
            <Icon type="icon_s_popupunfold" />
            <Box ml={10} cl="T020">
              icon_s_popupunfold
            </Box>
          </Box>
          <Box m={5}>
            <Icon type="icon_s_close" />
            <Box ml={10} cl="T020">
              icon_s_close
            </Box>
          </Box>
          <Box m={5}>
            <Icon type="icon_s_more" />
            <Box ml={10} cl="T020">
              icon_s_more
            </Box>
          </Box>
          <Box mt={5}>
            <Icon w={16} h={12} type="icon_s_hook" />
            <Box ml={10} cl="T020">
              icon_s_hook
            </Box>
          </Box>
        </Box>
        <Box col m={10} p={10} br={10} bg="B020">
          <Box f={20} cl="T010" DIN>
            Tag
          </Box>
          <Box col mt={10}>
            <Box>
              <Box m={5}>
                <Tag>大号标签</Tag>
              </Box>
              <Box m={5}>
                <Tag bg="Pur030" cl="Pur010" onPress={() => console.log('点击')}>
                  点击带icon标签
                  <Box ml={4}>
                    <Icon type="icon_s_rightshift_day" w={5} h={6} />
                  </Box>
                </Tag>
              </Box>
            </Box>
            <Box>
              <Box m={5}>
                <Tag size="s">小号标签</Tag>
              </Box>
              <Box m={5}>
                <Tag size="s" bg="Pur030" cl="Pur010">
                  小号标签
                </Tag>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box col m={10} p={10} br={10} bg="B020">
          <Box f={20} cl="T010" DIN>
            元素曝光示例
          </Box>
          <InView
          // onChange={(val) => {
          //   Toast.show(val ? '在视线' : '不在视线', val ? 1 : 0);
          // }}
          >
            <Box col mt={10}>
              <Box>这里是内容</Box>
            </Box>
          </InView>
        </Box>
        <Box col m={10} p={10} br={10} bg="B020">
          <Box f={20} cl="T010" DIN>
            Badge
          </Box>
          <Box col mt={10}>
            <Box>
              <Box m={5}>
                <Badge count={5}>
                  <Icon type="icon_s_module_loading" w={24} h={24} />
                </Badge>
              </Box>
              <Box m={10}>
                <Badge count={200}>
                  <Icon type="icon_s_module_loading" w={24} h={24} />
                </Badge>
              </Box>
              <Box my={10} mx={20}>
                <Badge count="右移中文角标" offset={[20, 0]}>
                  <Icon type="icon_s_module_loading" w={24} h={24} />
                </Badge>
              </Box>
            </Box>
            <Box>
              <Box m={5}>
                <Badge count={5} />
              </Box>
              <Box m={5}>
                <Badge count={100} />
              </Box>
              <Box m={5}>
                <Badge count="单独使用的中文角标" />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box col m={10} py={10} br={10} bg="Blu014">
          <Box f={20} mx={10} cl="T010" DIN>
            Card
          </Box>
          <Box>
            <Card
              title="货卡名称"
              assisText="辅助说明文字"
              jumpUrlText="详情"
              jumpUrl="/rn"
              actionsheetTitle="指标说明"
              actionsheetContent={
                <Box col flex={1}>
                  <Box cl="T020" flex={1}>
                    基金费率包括管理费，业绩报酬等，不同基金的费率收取规则不同，详细费用以合同为准
                  </Box>
                </Box>
              }
            >
              <Box col>
                <Box>
                  <Tag bg="B030" cl="T020">
                    指数型
                  </Tag>
                </Box>
                <Box style={{ justifyContent: 'space-between' }}>
                  <Box col>
                    <Box f={18} lh={25} cl="T010" fw="500" DIN>
                      4,642.90
                    </Box>
                    <Box f={12} lh={17} fw="400" cl="T020">
                      持有金额（元）
                    </Box>
                  </Box>
                  <Box col>
                    <Box f={18} lh={25} cl="Grn010" fw="500" DIN>
                      -83.90
                    </Box>
                    <Box f={12} lh={17} fw="400" cl="T020">
                      日收益（03-15）
                    </Box>
                  </Box>
                  <Box col>
                    <Box f={18} lh={25} cl="Red010" fw="500" DIN>
                      +127.49
                    </Box>
                    <Box f={12} lh={17} fw="400" cl="T020">
                      累计收益
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Box>
          <Box mt={12}>
            <Card title="不带辅助说明" jumpUrlText="暂无更多">
              <Box col bg="B030" px={12} py={12}>
                <Box style={{ justifyContent: 'space-between' }}>
                  <Box f={12} lh={17} fw="400" cl="T020">
                    累计收益率
                  </Box>
                  <Box f={12} lh={17} fw="500" cl="Red010" DIN>
                    +27.83%
                  </Box>
                  <Box f={12} lh={17} fw="400" cl="T020">
                    持有份额
                  </Box>
                  <Box f={12} lh={17} fw="500" cl="T010" DIN>
                    50,112.30
                  </Box>
                </Box>
                <Box style={{ justifyContent: 'space-between' }} mt={8}>
                  <Box f={12} lh={17} fw="400" cl="T020">
                    持有收益
                  </Box>
                  <Box f={12} lh={17} fw="500" cl="Red010" DIN>
                    +1888.90
                  </Box>
                  <Box f={12} lh={17} fw="400" cl="T020">
                    持有收益率
                  </Box>
                  <Box f={12} lh={17} fw="500" cl="Red010" DIN>
                    +22.90%
                  </Box>
                </Box>
              </Box>
            </Card>
          </Box>
          <Box mt={12}>
            <Card title="仅标题无跳转无补充icon" pb={0} />
          </Box>
        </Box>
        <Box col m={10} p={10} br={10} bg="B020">
          <Box f={20} mb={10} cl="T010" DIN>
            Press
          </Box>
          <Box>
            <Press onPress={() => console.log('click')}>
              <Box bg="Blu010" px={38} py={11} br={5}>
                Press
              </Box>
            </Press>
            <Press m={10} bg="Blu014" onPress={() => console.log('click')}>
              press
            </Press>
            <Press cl="T010" onPress={() => console.log('click')}>
              press
            </Press>
          </Box>
        </Box>
        <Box col m={10} p={10} br={10} bg="B020">
          <Box f={20} mb={10} cl="T010" DIN>
            Button
          </Box>
          <Box>
            <Button
              onPress={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 3000);
              }}
              mr={17}
              loading={loading}
              safe
            >
              点击loading
            </Button>
            <Button onPress={(e) => console.log(e)} disabled>
              主按钮禁用
            </Button>
          </Box>
          <Box mt={5}>
            <Button
              onPress={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 3000);
              }}
              type="secondary"
              loading={loading}
              mr={17}
            >
              次要按钮
            </Button>
            <Button onPress={(e) => console.log(e)} type="secondary" disabled>
              次按钮禁用
            </Button>
          </Box>
          <Box mt={5}>
            <Button onPress={(e) => console.log(e)} type="white" mr={17}>
              白底按钮
            </Button>
            <Button onPress={(e) => console.log(e)} type="white" disabled>
              白底禁用
            </Button>
          </Box>
          <Box mt={5} />
          <Box mt={5}>
            <Box flex={1} mr={17}>
              <Button onPress={() => setLoading(true)} loading={loading} size="m" mr={10} safe>
                发布
              </Button>
              <Button onPress={(e) => console.log(e)} size="m" disabled>
                未发布
              </Button>
            </Box>
            <Box flex={1}>
              <Button onPress={() => setLoading(true)} loading={loading} size="s" mr={10} safe>
                发布
              </Button>
              <Button onPress={(e) => console.log(e)} size="s" disabled>
                未发布
              </Button>
            </Box>
          </Box>
        </Box>
        <Box col m={10} p={10} br={10} bg="B020">
          <Box f={20} cl="T010" DIN>
            Radio&Checkbox
          </Box>
          <Box mt={5}>
            <Box c flex={1}>
              <Radio size="m" onChange={(checked) => console.log(checked)} mr={4} />
              <Box>默认</Box>
            </Box>
            <Box c flex={1}>
              <Radio size="m" onChange={(checked) => console.log(checked)} disabled mr={4} />
              <Box cl="T040">不可点</Box>
            </Box>
            <Box c flex={1}>
              <Radio size="m" onChange={(checked) => console.log(checked)} checked mr={4} />
              <Box>选中</Box>
            </Box>
          </Box>
          <Box mt={5}>
            <Box c flex={1}>
              <Radio size="s" onChange={(checked) => console.log(checked)} mr={4} />
              <Box>默认</Box>
            </Box>
            <Box c flex={1}>
              <Radio size="s" onChange={(checked) => console.log(checked)} disabled mr={4} />
              <Box cl="T040">不可点</Box>
            </Box>
            <Box c flex={1}>
              <Radio size="s" onChange={(checked) => console.log(checked)} checked mr={4} />
              <Box>选中</Box>
            </Box>
          </Box>
          <Box mt={5}>
            <Box c flex={1}>
              <Checkbox onChange={(checked) => console.log(checked)} mr={4} />
              <Box>默认</Box>
            </Box>
            <Box c flex={1}>
              <Checkbox onChange={(checked) => console.log(checked)} disabled mr={4} />
              <Box cl="T040">不可点</Box>
            </Box>
            <Box c flex={1}>
              <Checkbox onChange={(checked) => console.log(checked)} checked mr={4} />
              <Box>选中</Box>
            </Box>
          </Box>
        </Box>
        <Box col m={10} p={10} br={10} h={200} bg="B020">
          <Box>
            <Txt f={20} cl="T010" DIN>
              Tabs
            </Txt>
          </Box>
          <Tabs startIndex={1} title={['第一个', '第二个', '第三个']} onChange={(e) => console.log(e)}>
            <Box c w="100%" h={100} bg="Blu014" br={10}>
              第一个tab
            </Box>
            <Box c w="100%" h={100} bg="Blu010" br={10}>
              第二个tab
            </Box>
            <Box c w="100%" h={100} bg="B030" br={10}>
              第三个tab
            </Box>
          </Tabs>
        </Box>
        <Box col m={10} p={10} br={10} bg="B020" h={200}>
          <Box f={20} cl="T010" DIN>
            Swiper
          </Box>
          <Swiper>
            <Box flex={1} c bg="Blu014" br={10}>
              第一个Swiper
            </Box>
            <Box flex={1} c w="100%" h={100} bg="Blu010" br={10}>
              第二个Swiper
            </Box>
            <Box flex={1} c w="100%" h={100} bg="B030" br={10}>
              第三个Swiper
            </Box>
          </Swiper>
        </Box>
        <Box col m={10} p={10} br={10} bg="B020">
          <Box f={20} cl="T010" DIN>
            Modals
          </Box>
          <Box>
            <PButton c m={10} bg="Blu014" onPress={() => setModalVisible(true)} DIN>
              open
            </PButton>
          </Box>

          <Modal
            visible={modalVisible}
            onCancel={() => setModalVisible(false)}
            onOk={() => setModalVisible(false)}
            modalTitle="我是标题最多十三字不可折行"
            modalDesc="我是对话框正文，支持多行，建议显示文案在三行以内，折行后文案左对齐展示"
          />
        </Box>
        <ActionSheets />
        <Box col m={10} p={10} br={10} bg="B020">
          <Box f={20} cl="T010" DIN>
            Progress
          </Box>
          <Box col>
            <Box m={5}>
              <Progress percent={0.1} steps={3} itemStyle={{}} />
            </Box>
            <Box m={5}>
              <Progress percent={0.3} steps={4} itemStyle={{}} />
            </Box>
            <Box m={5}>
              <Progress percent={0.5} steps={5} itemStyle={{}} />
            </Box>
          </Box>
        </Box>
        <Box col m={10} p={10} br={10} bg="B020">
          <Box f={20} cl="T010" DIN>
            Loading
          </Box>
          <Box>
            <Loading h={100} />
          </Box>
        </Box>
        <Box col m={10} p={10} br={10} bg="B020">
          <Box f={20} cl="T010" DIN>
            DatePicker
          </Box>
          <Box>
            <Button
              onPress={() => {
                setVisible(true);
              }}
              size="m"
              mr={17}
            >
              选择
            </Button>
          </Box>
          <DatePicker
            visible={visible}
            tip="DatePicker 组件"
            onRequestClose={() => setVisible(false)}
            onCloseIconClick={() => setVisible(false)}
            onFooterClick={() => setVisible(false)}
          />
        </Box>
        <Box col m={10} p={10} br={10} bg="B020">
          <Box f={20} cl="T010" DIN>
            sparkLine
          </Box>
          <Box>
            <SparkLineDemo />
          </Box>
        </Box>
        <Box col m={10} p={10} br={10} bg="B020">
          <Box f={20} cl="T010" DIN>
            空状态
          </Box>
          <Box pb={20}>
            <Empty mt={20} text="这里是自定义文案" />
          </Box>
        </Box>
        <Box col m={10} p={10} br={10} bg="B020">
          <Box f={20} cl="T010" DIN>
            图片
          </Box>
          <Box mt={10} style={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Box col w={150}>
              <Box>期望宽度100，高度等比例适配</Box>
              <Box>
                <Img source={{ uri: 'https://xqimg.imedao.com/1811de0356b43273fe4a0066.png' }} w={100} />
              </Box>
            </Box>
            <Box col w={150}>
              <Box>期望高度100，宽度等比例适配</Box>
              <Box>
                <Img source={{ uri: 'https://xqimg.imedao.com/1811de0356b43273fe4a0066.png' }} h={100} />
              </Box>
            </Box>
          </Box>
          <Box mt={20} style={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Box col w={150}>
              <Box>宽高设置1/2，尺寸差别大，调整为contain模式</Box>
              <Box>
                <Img
                  source={{ uri: 'https://xqimg.imedao.com/1811de0356b43273fe4a0066.png' }}
                  w={100}
                  h={200}
                  autoContainImage
                />
              </Box>
            </Box>
            <Box col w={150}>
              <Box>宽高设置1/2，不配置默认cover</Box>
              <Box>
                <Img source={{ uri: 'https://xqimg.imedao.com/1811de0356b43273fe4a0066.png' }} h={200} w={100} />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box col m={10} p={10} br={10} bg="B020">
          <Box f={20} cl="T010" DIN>
            NoticeBar
          </Box>
          <Box bg="#072872">
            <NoticeBar text="滚动提示条" />
          </Box>
        </Box>
        <Box col m={10} p={10} br={10} bg="B020">
          <Box f={20} cl="T010" DIN>
            对比条
          </Box>
          <Box pb={20}>
            <ContrastBarDemo />
          </Box>
        </Box>
        <Box col m={10} p={10} br={10} bg="B020">
          <Box f={20} cl="T010" DIN>
            堆叠柱状条
          </Box>
          <Box pb={20}>
            <StackedBarDemo />
          </Box>
        </Box>
        <Box col m={10} p={10} br={10} bg="B020">
          <Box f={20} cl="T010" DIN>
            Popup
          </Box>
          <Box py={20}>
            <Button
              onPress={() => {
                setPopupVisible(true);
              }}
            >
              展示
            </Button>
            <Popup
              visible={popupVisible}
              onClose={() => {
                setPopupVisible(false);
              }}
            >
              <Box bg="B020" w="100%" h="100%" col px={20}>
                <Txt lh={50}>默认配置：</Txt>
                <Txt lh={50}>w: 280 h: 378</Txt>
                <Txt lh={50}>show动画：打开 hide动画：关闭</Txt>
              </Box>
            </Popup>
          </Box>
        </Box>
        <Box col m={10} p={10} br={10} bg="B020">
          <Box f={20} cl="T010" DIN>
            PieChart
          </Box>
          <Box flex={1}>
            <Box pt={20} pb={20} flex={1} c>
              <PieChart
                data={[
                  { percent: 0.6, color: ThemeColor.Chart009.day },
                  { percent: 0.25, color: ThemeColor.Chart006.day },
                  { percent: 0.15, color: ThemeColor.Chart007.day },
                ]}
                width={108}
                height={108}
              />
            </Box>
            <Box pt={20} pb={20} flex={1} c>
              <PieChart
                data={[
                  { percent: 0.35, color: ThemeColor.Chart001.day },
                  { percent: 0.25, color: ThemeColor.Chart002.day },
                  { percent: 0.15, color: ThemeColor.Chart003.day },
                  { percent: 0.25, color: ThemeColor.Chart008.day },
                ]}
                width={108}
                height={108}
                innerCircleRadius={28}
                renderCenterChildComponent={(centerX, centerY) => (
                  <SVGText
                    x={centerX}
                    y={centerY}
                    fill={ThemeColor.T010.day}
                    fontSize={12}
                    textAnchor="middle"
                    alignmentBaseline="central"
                  >
                    组合持仓
                  </SVGText>
                )}
              />
            </Box>
          </Box>
        </Box>
        <Box col m={10} p={10} br={10} bg="B020">
          <Box f={20} cl="T010" DIN>
            Countdown
          </Box>
          <Box c>
            <Countdown onEnd={() => console.log('end')} desc="查询中，请稍后..." initSeconds={15} />
          </Box>
        </Box>
      </Box>
    </IOScrollView>
  );
};

export default Product;
