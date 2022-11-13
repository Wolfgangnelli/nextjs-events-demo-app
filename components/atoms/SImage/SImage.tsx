import React, { useState } from "react";
import Image from "next/image";

interface Props {
  src?: string;
  alt?: string;
  title?: string;
  className?: string;
  maxWidth?: number;
  maxHeight?: number;
  layout?: "fixed" | "fill" | "intrinsic" | "responsive";
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  objectPosition?: string;
  priority?: false | true;
  loading?: "lazy" | "eager";
  quality?: number;
  style?: any;
  sizes?: string;
  fill?: any;
}

const SImage = (props: Props) => {
  const {
    src = "",
    alt = "",
    title = "",
    maxWidth = 0,
    maxHeight = 0,
    className = "",
    layout = undefined,
    objectFit = undefined,
    objectPosition = undefined,
    priority = false,
    loading = "lazy",
    quality = 75,
  } = props;

  const [imgSrc, setImgSrc] = useState(src);
  const fallbackImage = `https://via.placeholder.com/${maxWidth}x${maxHeight}`;

  return layout ? (
    <Image
      src={imgSrc || fallbackImage}
      alt={alt}
      title={title}
      layout={layout}
      width={layout !== "fill" ? maxWidth : undefined}
      height={layout !== "fill" ? maxHeight : undefined}
      objectFit={objectFit}
      objectPosition={objectPosition}
      priority={priority}
      loading={loading}
      quality={quality}
      onError={() => {
        setImgSrc(fallbackImage);
      }}
    />
  ) : (
    <img
      src={src || fallbackImage}
      alt={alt}
      title={title}
      className={className}
    />
  );
};

export default SImage;
