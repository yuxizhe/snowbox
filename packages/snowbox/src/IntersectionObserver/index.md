---
nav:
  title: Components
  path: /components
# mobile: false
group:
  title: Components
---

# IntersectionObserver

滚动曝光组件，可以记录曝光时间

目标元素出现在视线内和离开视线内都会触发回调

场景：滚动曝光埋点，出现在视线上报埋点，离开视线上报埋点

## 示例

```jsx
import React, { useState } from 'react';
import { Observer, Box } from 'snowbox';
const { IOScrollView, InView } = Observer;

export default () => {
  const [inView, setInView] = useState(false);
  return (
    <>
      <IOScrollView>
        <Box col bg="B010">
          <Box h={200} c>
            1
          </Box>
          <InView
            // 可以不传moduleName
            moduleName="基金业绩"
            onChange={(value, options) => {
              const {
                expose: { start, end },
                moduleName,
              } = options;

              setInView(value);
            }}
          >
            <Box mt={20} h={300} bg={'Blu010'} c f={16}>
              目标元素
            </Box>
          </InView>
          <Box h={300} c>
            2
          </Box>
          <Box h={300} c>
            3
          </Box>
          <Box h={300} c>
            4
          </Box>
        </Box>
      </IOScrollView>
      <div
        style={{
          position: 'fixed',
          top: '10%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          padding: 8,
          width: 110,
          borderRadius: 20,
          fontSize: 14,
          background: '#FFE091',
        }}
      >
        {`${inView ? '' : '不'}在视线`}
      </div>
    </>
  );
};
```

- 最外层 ScrollView 需使用 IOScrollView 代替，不影响原先的 scrollView 组件 Props，比如 scrollEventThrottle，onScroll，scrollEnabled 等方法。

- 内部需要曝光的元素需要使用 InView 组件包裹，onChange 为元素出现或消失在视线时出发的回调，第一个参数为布尔值是否在视线范围内，第二个参数为包含模块名字和曝光时间在内的对象。

> note: 如果 InView 元素需要用到 onLayout 得到目标元素尺寸信息，不建议直接写在 Inview 上，请使用 snowbox -> AnchorView 包裹 InView eg: `<AnchorView onLayout={() => {}}><InView></InView></AnchorView>`

## onChange 回调

```js
// 改变时触发
type onChange = (value: boolean, options: Options) => void;

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
```

## 说明

客户端和 web 端实现原理不一致

客户端使用 onScrollView 方法滚动时实时计算

web 端使用原生方法 IntersectionObserver 封装实现
