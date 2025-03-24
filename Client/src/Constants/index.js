export const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    position: isSmall
      ? [0, 2.5, 0]
      : isMobile
      ? [0, 3, 0]
      : isTablet
      ? [0, -1, 0]
      : [0, 0, 0],
    scale: isSmall ? 1 : isMobile ? 2 : 3,
  };
};
