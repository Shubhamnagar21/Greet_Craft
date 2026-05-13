export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return path;
};

export const shareToWhatsApp = (text, url) => {
  const encoded = encodeURIComponent(`${text} ${url || ''}`);
  window.open(`https://wa.me/?text=${encoded}`, '_blank');
};

export const shareViaEmail = (subject, body) => {
  window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
};

export const nativeShare = async (title, text, url) => {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return true;
    } catch {
      return false;
    }
  }
  return false;
};

export const downloadCanvasImage = (canvas, filename = 'greeting-card.png') => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png', 1.0);
  link.click();
};

export const categories = [
  { label: 'All', value: '' },
  { label: 'Birthday', value: 'Birthday' },
  { label: 'Anniversary', value: 'Anniversary' },
  { label: 'Festivals', value: 'Festivals' },
  { label: 'Shayari', value: 'Shayari' },
  { label: 'Joke', value: 'Joke' },
  { label: 'Updesh', value: 'Updesh' },
  { label: 'Love', value: 'Love' },
  { label: 'Trending', value: 'Trending' },
];
