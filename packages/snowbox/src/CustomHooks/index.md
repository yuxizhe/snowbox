---
nav:
  title: Components
  path: /components
mobile: false
group:
  title: Components
---

# CustomHooks

自定义通用hooks

## useSubscriptionsWithVerify

通用的带校验是否是当前页面的RN订阅客户端事件hooks。

> 客户端会把symbol和url传回，前端使用传入的symbol或者url与客户端传回的进行对比，一致才会执行回调

参数解释：
  - 订阅事件name
  - object  如果传入symbol，优先使用symbol，否则使用url
  
    a. symbol为基金symbol
    
    b. url为当前页面url
    
    c. moduleName为RN页面name

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
      console.log('do something')
    },
  )
```


> 解释：客户端页面栈内如果有多个相同页面，比如多个基金个基页（a,b,c），如果其中一个基金页面(c)触发订阅事件，栈内所有的页面都会收到消息(a,b,c)执行后续逻辑，存在bug风险。因此用url或者symbol来进行校验