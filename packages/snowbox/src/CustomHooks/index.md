---
nav:
  title: Components
  path: /components
mobile: false
group:
  title: Components
---

# CustomHooks

自定义通用 hooks

## useSubscriptionsWithVerify

通用的带校验是否是当前页面的 RN 订阅客户端事件 hooks。

> 客户端会把 symbol 和 url 传回，前端使用传入的 symbol 或者 url 与客户端传回的进行对比，一致才会执行回调

参数解释：

- 订阅事件 name
- object 如果传入 symbol，优先使用 symbol，否则使用 url

  a. symbol 为基金 symbol

  b. url 为当前页面 url

  c. moduleName 为 RN 页面 name

- 回调，执行自定义逻辑
  eg:

```js
useSubscriptionsWithVerify(
  'pfModalAppointmentTacticsFund',
  {
    url,
    moduleName: 'PrivateFundProduct',
    symbol,
  },
  () => {
    console.log('do something');
  },
);
```

> 解释：客户端页面栈内如果有多个相同页面，比如多个基金个基页（a,b,c），如果其中一个基金页面(c)触发订阅事件，栈内所有的页面都会收到消息(a,b,c)执行后续逻辑，存在 bug 风险。因此用 url 或者 symbol 来进行校验
