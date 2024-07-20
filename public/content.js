/* eslint-disable no-undef */

window.onload = () => {
  // Function to get the video title from the DOM
  function getVideoTitle() {
    const videoTitleElement = document.querySelector('h1.title.style-scope.ytd-video-primary-info-renderer');
    return videoTitleElement ? videoTitleElement.textContent.trim() : null;
  }

  // Function to separate artist and song name
  function parseTitle(title) {
    const regex = /^(.*?)\s*-\s*["']?(.*?)["']?\s*(?:\(.*\))?$/;
    const match = title.match(regex);
    if (match) {
      const artist = match[1];
      const song = match[2];
      return { artist, song };
    } else {
      return null;
    }
  }

  // Function to check and send the video title
  function checkAndSendTitle() {
    const videoTitle = getVideoTitle();
    if (videoTitle) {
      const parsedTitle = parseTitle(videoTitle);
      if (parsedTitle) {
        chrome.runtime.sendMessage({ type: "FROM_CONTENT", payload: parsedTitle });
        console.log('Artist:', parsedTitle.artist);
        console.log('Song:', parsedTitle.song);
      } else {
        console.log('Could not parse title');
      }
    }
  }

  // Initial log of the video title
  checkAndSendTitle();

  // Set up an interval to check the video title every 30 seconds
  setInterval(checkAndSendTitle, 2000);

  console.log("Valid when YouTube is open");
};
