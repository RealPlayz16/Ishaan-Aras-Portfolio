export function desktopWindowWidth(viewportWidth: number) {
  if (viewportWidth < 760) return Math.max(0, viewportWidth - 16);
  if (viewportWidth >= 1500) return 1030;
  if (viewportWidth <= 1100) return viewportWidth - 145;
  return Math.min(940, viewportWidth - 165);
}

export function clampWindowPosition(
  x: number,
  y: number,
  viewportWidth: number,
  viewportHeight: number
) {
  const width = desktopWindowWidth(viewportWidth);
  return {
    x: Math.max(8, Math.min(x, viewportWidth - width - 8)),
    y: Math.max(52, Math.min(y, Math.max(52, viewportHeight - 180))),
  };
}
