import React from 'react';
import { Box, Img, Badge } from 'snowbox';
import { ThemeColor } from 'snowbox';
import { boxTypes } from 'snowbox/src/Utils/props';
import Config from './config';

interface BageProps {
  /**
   * background 背景颜色 默认为'Org010'
   * 填写雪球统一设计规范的颜色代码
   */
  bg?: keyof typeof ThemeColor | (string & {});
  /**
   * color 颜色 默认为'T060'
   * 填写雪球统一设计规范的颜色代码
   */
  cl?: keyof typeof ThemeColor | (string & {});
  /**
   * 展示封顶的数字值，默认为 99。
   */
  overflowCount?: number;
  /**
   * 当数值为 0 时，是否展示 Badge。
   */
  showZero?: boolean;
  /**
   * 偏移量
   * 徽标默认right为徽标-1/2宽度，top为-1/2高度(6px)。
   * 位置偏移格式为 [right, top]，表示状态点距默认位置往右(正值)、往上(正值)的偏移量。
   */
  offset?: [number | string, number | string];
  children?: React.ReactNode;
}

interface Contribute extends boxTypes {
  /**
   * config中的key,对应Ldap用户名，邮箱前缀
   */
  name?: keyof typeof Config;
  /**
   * username 中文名,对应config username
   */
  username?: string;
  /**
   * companyID 工号，对应config companyID
   */
  companyID?: string;
  /**
   * 角标内容,不写默认展示中文名，如果没有 不展示
   */
  badgeCount?: string;
  /**
   * 是否展示Badge,优先级高于BadgeCount
   */
  showBadge?: boolean;
  /**
   * 头像size,默认50
   */
  size?: number;
  /**
   * 角标配置
   */
  bageSet?: BageProps;
  /**
   * 头像图片style设置
   */
  imgStyle?: boxTypes;
}

export default ({
  name,
  username = '',
  companyID = '',
  badgeCount = '',
  showBadge = true,
  bageSet = {},
  size = 50,
  style,
  imgStyle = {},
  ...otherProps
}: Contribute) => {
  let obj = {
    uri: '',
    username: '',
  };
  const findMatch = (key, val) => {
    for (let idx in Config) {
      if (Config[idx][key] === val) {
        obj.uri = Config[idx].uri;
        obj.username = Config[idx].username;
      }
    }
    return {};
  };
  if (name && Config[name]) {
    obj.uri = Config[name].uri;
    obj.username = Config[name].username;
  } else if (username) {
    findMatch('username', username);
  } else if (companyID) {
    findMatch('companyID', companyID);
  }
  return (
    <>
      {obj.uri ? (
        <Box {...otherProps}>
          {showBadge ? (
            <Badge count={badgeCount || obj.username} {...bageSet}>
              <Img
                w={size}
                h={size}
                source={{ uri: obj.uri }}
                style={[{ borderRadius: '50%', border: '1px solid #CCCCCC' }, imgStyle]}
              ></Img>
            </Badge>
          ) : (
            <Img
              w={size}
              h={size}
              source={{ uri: obj.uri }}
              style={[{ borderRadius: '50%', border: '1px solid #CCCCCC' }, imgStyle]}
            ></Img>
          )}
        </Box>
      ) : null}
    </>
  );
};
