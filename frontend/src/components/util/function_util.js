export const abbreviate = (string, max_char) => {
    const splitString = string?.split("")
    if (splitString?.length > max_char) {
        return splitString?.splice(0, max_char).join("").concat("...")
    }
    else {
        return string
    }
}

const timeSinceHelper = date => {

    let seconds = Math.floor((new Date() - date) / 1000);
  
    let interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return "just now";
}

export const timeSince = (date) => {
  return timeSinceHelper(new Date(date))
}