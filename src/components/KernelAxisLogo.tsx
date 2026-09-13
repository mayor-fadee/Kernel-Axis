import React from 'react';

export const KERNEL_AXIS_LOGO_URL = 'https://res.cloudinary.com/dc0hquoqv/image/upload/v1785232589/njhiczg65kcqrmim6yj8.png';

interface KernelAxisLogoProps {
  className?: string;
  size?: number | string;
}

export const KernelAxisLogo: React.FC<KernelAxisLogoProps> = ({ 
  className = '',
  size
}) => {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <img 
      src={KERNEL_AXIS_LOGO_URL} 
      alt="Kernel Axis Logo" 
      style={style}
      className={`object-contain shrink-0 ${className || 'w-8 h-8'}`} 
      referrerPolicy="no-referrer"
    />
  );
};
