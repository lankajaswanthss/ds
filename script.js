const pipButton = document.getElementById('pip-button');
const myFrame = document.getElementById('my-frame');

pipButton.addEventListener('click', async () => {
  if (!document.pictureInPictureEnabled) {
    console.log('Picture-in-Picture is not supported in this browser.');
    return;
  }

  try {
    if (!document.pictureInPictureElement) {
      await myFrame.requestPictureInPicture();
    } else {
      await document.exitPictureInPicture();
    }
  } catch (error) {
    console.error(error);
  }
});
