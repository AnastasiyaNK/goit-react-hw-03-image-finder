import axios from 'axios';

export const fetchImages = async (query, page) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=38960766-ca3732db6d6d2dbd2c03e237a&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};
