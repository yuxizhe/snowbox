---
nav:
  title: Components
  path: /components
# mobile: false
group:
  title: Components
---

# IntersectionObserver 滚动曝光

滚动曝光组件，可以记录曝光时间

目标元素出现在视线内和离开视线内都会触发回调

场景：滚动曝光埋点，出现在视线上报埋点，离开视线上报埋点

## 示例

```js
import { Observer } from 'snowbox';
const { IOScrollView, InView } = Observer;
interface Options {
  // 是否在视线内
  inView: boolean;
  // 曝光时间，时间戳
  expose: {
    start: 0,
    end: 0,
  };
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
</IOScrollView>;
```

- 最外层 ScrollView 需使用 IOScrollView 代替，不影响原先的 scrollView 组件 Props，比如 scrollEventThrottle，onScroll，scrollEnabled 等方法。

- 内部需要曝光的元素需要使用 InView 组件包裹，onChange 为元素出现或消失在视线时出发的回调，第一个参数为布尔值是否在视线范围内，第二个参数为包含模块名字和曝光时间在内的对象。

> note: 如果 InView 元素需要用到 onLayout 得到目标元素尺寸信息，不建议直接写在 Inview 上，请使用 snowbox -> AnchorView 包裹 InView eg: `<AnchorView onLayout={() => {}}><InView></InView></AnchorView>`

## 说明

客户端和 web 端实现原理不一致

客户端使用 onScrollView 方法滚动时实时计算

web 端使用原生方法 IntersectionObserver 封装实现
