export const enterFullscreen = (id: string) => {
  const fullscreenElement = document.getElementById(id);
  if (!fullscreenElement) return;
  if (fullscreenElement.requestFullscreen) {
    fullscreenElement.requestFullscreen();
    // @ts-ignore
  } else if (fullscreenElement.mozRequestFullScreen) {
    // @ts-ignore
    fullscreenElement.mozRequestFullScreen();
    // @ts-ignore
  } else if (fullscreenElement.webkitRequestFullscreen) {
    // @ts-ignore
    fullscreenElement.webkitRequestFullscreen();
    // @ts-ignore
  } else if (fullscreenElement.msRequestFullscreen) {
    // @ts-ignore
    fullscreenElement.msRequestFullscreen();
  }
};

export const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
    // @ts-ignore
  } else if (document.mozCancelFullScreen) {
    // @ts-ignore
    document.mozCancelFullScreen();
    // @ts-ignore
  } else if (document.webkitExitFullscreen) {
    // @ts-ignore
    document.webkitExitFullscreen();
    // @ts-ignore
  } else if (document.msExitFullscreen) {
    // @ts-ignore
    document.msExitFullscreen();
  }
};

export const isFullscreen = () => {
  return (
    document.fullscreenElement ||
    // @ts-ignore
    document.mozFullScreenElement ||
    // @ts-ignore
    document.webkitFullscreenElement ||
    // @ts-ignore
    document.msFullscreenElement
  );
};

export default (id: string) => {
  if (isFullscreen()) {
    exitFullscreen();
  } else {
    enterFullscreen(id);
  }
};
