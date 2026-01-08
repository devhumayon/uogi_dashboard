export const headingFromURL = (url) => {
  try {
    const parts = url.split("/");
    const lastPart = parts[parts.length - 1];
    const formattedHeading = lastPart
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return formattedHeading;
  } catch (error) {
    console.log("No Pathname");
  }
};
