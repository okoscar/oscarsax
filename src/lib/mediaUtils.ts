
export const getYouTubeID = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};


export const isYouTubeURL = (url: string) => {
  return !!getYouTubeID(url);
};

export const getEmbedUrl = (url: string) => {
  const ytId = getYouTubeID(url);
  if (ytId) return `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&modestbranding=1`;
  
  if (isSpotifyURL(url)) {
    const spotifyId = getSpotifyID(url);
    const type = url.includes('/track/') ? 'track' : url.includes('/album/') ? 'album' : 'playlist';
    return `https://open.spotify.com/embed/${type}/${spotifyId}`;
  }

  if (isSoundCloudURL(url)) {
    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
  }
  
  return url;
};

export const getSpotifyID = (url: string) => {
  const match = url.match(/spotify\.com\/(track|album|playlist)\/([a-zA-Z0-9]+)/);
  return match ? match[2] : null;
};

export const isSpotifyURL = (url: string) => {
  return !!getSpotifyID(url);
};

export const isSoundCloudURL = (url: string) => {
  return url.includes('soundcloud.com');
};



export const isVideoFile = (url: string) => {
  if (!url) return false;
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.quicktime'];
  // Remove query parameters before checking the extension
  const urlWithoutQuery = url.split('?')[0].toLowerCase();
  return videoExtensions.some(ext => urlWithoutQuery.endsWith(ext));
};

export const isImageFile = (url: string) => {
  if (!url) return false;
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'];
  const urlWithoutQuery = url.split('?')[0].toLowerCase();
  return imageExtensions.some(ext => urlWithoutQuery.endsWith(ext));
};
