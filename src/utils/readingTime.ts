/**
 * Calculate the estimated reading time for a given text
 * @param text The text content to analyze
 * @param wordsPerMinute The average reading speed (default: 200 words per minute)
 * @returns An object with minutes, seconds and the formatted reading time string
 */
export function getReadingTime(text: string, wordsPerMinute: number = 200) {
  // Strip HTML tags if present
  const plainText = text.replace(/<\/?[^>]+(>|$)/g, '');
  
  // Count words by splitting on whitespace
  const words = plainText.trim().split(/\s+/).length;
  
  // Calculate reading time in minutes and seconds
  const minutes = Math.floor(words / wordsPerMinute);
  const seconds = Math.floor((words % wordsPerMinute) / (wordsPerMinute / 60));
  
  // Format the reading time
  let readingTime = '';
  if (minutes > 0) {
    readingTime = `${minutes} min`;
    if (seconds > 0) readingTime += ` ${seconds} sec`;
  } else {
    readingTime = `${seconds} sec`;
  }
  
  return {
    minutes,
    seconds,
    text: readingTime
  };
}
