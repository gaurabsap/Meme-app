const convertTimestamp = (timestamp) => {
  const postedTime = new Date(timestamp);
  const currentTime = new Date();

  const timeDifference = Math.abs(currentTime - postedTime);
  const minutes = Math.floor(timeDifference / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days >= 1) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours >= 1) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
};

export default convertTimestamp;
