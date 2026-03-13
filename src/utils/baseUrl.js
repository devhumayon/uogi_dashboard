export const  getBaseUrl = () => {
  // return "http://10.10.7.65:8075/api/v1";
  return process.env.REACT_APP_BASE_URL;
  // return "http://localhost:5000/api/v1";
};

export const getImageUrl = () => {
  // return "http://10.10.7.65:8075";
  return process.env.REACT_APP_IMAGE_URL;
};
