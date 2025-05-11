import { useState } from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export const Image = ({ src, alt, fallback = "/placeholder.svg", ...props }: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <img
      src={error ? fallback : src}
      alt={alt}
      loading="lazy"
      onLoad={() => setIsLoading(false)}
      onError={() => setError(true)}
      className={`
        transition-opacity duration-300
        ${isLoading ? 'opacity-0' : 'opacity-100'}
        ${props.className || ''}
      `}
      {...props}
    />
  );
};