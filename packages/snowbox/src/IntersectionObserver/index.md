---
nav:
  title: Components
  path: /components
mobile: false
group:
  title: Components
---

# IntersectionObserver

滚动曝光组件，可以记录曝光时间

目标元素出现在视线内和离开视线内都会触发回调

场景：滚动曝光埋点，出现在视线上报埋点，离开视线上报埋点

## 使用方式

```js
import { Observer } from 'snowbox'
const { IOScrollView, InView } = Observer;
interface Options {
    // 是否在视线内
    inView: boolean;
    // 曝光时间，时间戳
    expose: {
      start: 0,
      end: 0,
    },
    // 模块名字
    moduleName: string;
}
<IOScrollView>
  <Box col bg="B010">
    <InView
      // 可以不传moduleName
      moduleName="基金业绩"
      onChange={(value: boolean, options: Options) => {
        // value 为是否在视线范围内，options内容如上
        handleScrollTrackEvnet(value, options);
      }}
    >
      <FundPerformance />
    </InView>
  </Box>
</IOScrollView>
```

- 最外层ScrollView需使用IOScrollView代替，不影响原先的scrollView组件Props，比如scrollEventThrottle，onScroll，scrollEnabled等方法。

- 内部需要曝光的元素需要使用InView组件包裹，onChange为元素出现或消失在视线时出发的回调，第一个参数为布尔值是否在视线范围内，第二个参数为包含模块名字和曝光时间在内的对象。

> note: 如果InView元素需要用到onLayout得到目标元素尺寸信息，不建议直接写在Inview上，请使用snowbox -> AnchorView 包裹InView eg: `<AnchorView onLayout={() => {}}><InView></InView></AnchorView>`
## 说明

客户端和web端实现原理不一致

客户端使用onScrollView方法滚动时实时计算

web端使用原生方法IntersectionObserver封装实现
