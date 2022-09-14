---
nav:
  title: Components
  path: /components
# mobile: false
group:
  title: Components
  order: 3
---

# ExpandTxt 折叠文字

```jsx
import React from 'react';
import { ExpandTxt, Box, Txt } from 'snowbox';

const expandTxtContent =
  '《琵琶行》是唐代诗人白居易创作的长篇叙事诗。此诗通过对琵琶女高超弹奏技艺和她不幸经历的描述，揭露了封建社会官僚腐败、民生凋敝、人才埋没等不合理现象，表达了诗人对她的深切同情，也抒发了诗人对自己无辜被贬的愤懑之情。全诗叙事与抒情紧密结合，塑造出完整鲜明的人物形象；语言流转匀称，优美和谐，特别是描绘琵琶的演奏，比喻贴切，化虚为实，呈现出鲜明的音乐形象';
export default () => {
  return (
    <Box p={12}>
      <Txt>
        <ExpandTxt content={expandTxtContent} />
      </Txt>
    </Box>
  );
};
```

<API></API>
