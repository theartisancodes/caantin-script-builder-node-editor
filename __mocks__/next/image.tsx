import React from 'react';
import { ImageProps } from 'next/image';

const NextImage = (props: ImageProps) => {
  return <img {...props} />;
};

export default NextImage;
