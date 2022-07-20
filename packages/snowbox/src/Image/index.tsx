import React, { useEffect, useState } from 'react';
import { Image, ImageProps, ImageResizeMode, ImageURISource } from 'react-native';
import { getSize } from '../Utils';

type Props = ImageProps & {
  /**
   * 图片源数据（仅支持远程URL地址）
   */
  source: ImageURISource;
  /**
   * 预期图片展示高度（缺省则按照宽度等比例缩放）
   */
  h?: number;
  /**
   * 预期图片展示宽度（缺省则按照高度等比例缩放）
   */
  w?: number;
  /**
   * 图片实际尺寸与展示尺寸相差过大，自动缩放图片（默认关闭）
   */
  autoContainImage?: boolean;
  /**
   * Image原生属性，配置后则覆盖autoContainImage效果
   */
  resizeMode?: ImageResizeMode;
};

/**
 * 网络图片
 */

function Img({ w, h, style, source, autoContainImage = false, resizeMode, ...props }: Props) {
  const { uri: url = '' } = source;
  const [size, setSize] = useState<{ w?: number; h?: number }>({ w: 0, h: 0 });
  const [_resizeMode, setResizeMode] = useState<ImageResizeMode>('cover');
  useEffect(() => {
    let tempSize = { w, h };
    Image.getSize(url, (width, height) => {
      if (w && h && autoContainImage && !resizeMode) {
        (height / width > (1.5 * h) / w || width / height > (1.5 * w) / h) && setResizeMode('contain');
      } else if (!h && w) {
        tempSize = { h: (height / width) * w, w };
      } else if (h && !w) {
        tempSize = { w: (width / height) * h, h };
      } else if (!h && !w) {
        tempSize = { w: width, h: height };
      }
      setSize(tempSize);
    });
  }, [url, w, h]);
  return (
    <Image
      {...props}
      resizeMode={resizeMode || _resizeMode}
      source={{ uri: url }}
      style={[{ width: getSize(size.w), height: getSize(size.h) }, style]}
    />
  );
}

export default Img;
