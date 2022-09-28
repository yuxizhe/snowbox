import React from 'react';
import { Box, Img, Badge } from 'snowbox';
import { ThemeColor } from 'snowbox';
import { Props } from 'snowbox/src/Badge';
import { boxTypes } from 'snowbox/src/Utils/props';
import Config from './config';

type BadgeProps = Omit<Props, 'count'>;

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
   * email 邮箱， 对应config email
   */
  email?: string;
  /**
   * 角标内容,不写默认展示中文名，如果没有中文名则不展示
   */
  badgeCount?: string;
  /**
   * 是否展示Badge,优先级高于badgeCount
   */
  showBadge?: boolean;
  /**
   * 头像size,默认50
   */
  size?: number;
  /**
   * 角标配置
   */
  bageSet?: BadgeProps;
  /**
   * 头像图片style设置
   */
  imgStyle?: boxTypes;
}

export default ({
  name,
  username = '',
  companyID = '',
  email = '',
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
        break;
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
  } else if (email) {
    findMatch('email', email);
  }

  const renderContent = () => (
    <Img
      w={size}
      h={size}
      source={{ uri: obj.uri }}
      style={[{ borderRadius: '50%', border: '1px solid #CCCCCC' }, imgStyle]}
    ></Img>
  );
  return (
    <>
      {obj.uri ? (
        <Box {...otherProps}>
          {showBadge ? (
            <Badge count={badgeCount || obj.username} {...bageSet}>
              {renderContent()}
            </Badge>
          ) : (
            renderContent()
          )}
        </Box>
      ) : null}
    </>
  );
};
