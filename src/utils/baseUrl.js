export const  getBaseUrl = () => {
  // return "http://10.10.7.65:8075/api/v1";
 return import.meta.env.VITE_BASE_URL; 
  // return "http://localhost:5000/api/v1";
};

export const getImageUrl = () => {
  // return "http://10.10.7.65:8075";
    return import.meta.env.VITE_IMAGE_URL;
};
