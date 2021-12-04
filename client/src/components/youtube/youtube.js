import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const { REACT_APP_YT_KEY } = process.env;
console.log(REACT_APP_YT_KEY);
export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    maxResults: 5,
    key: REACT_APP_YT_KEY,
  },
});
