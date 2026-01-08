import { create } from 'zustand';
import axios from 'axios';

const API_URL = "https://api.unsplash.com/search/photos"
const API_KEY = "98IZBgfB7oilX6BeswvQeMOQs4YMYbkjgGyOZuHh5ig"
const PER_PAGE = 30

interface ImageState {
  imageList: [];
  getSearchImages: (searchStr: string, pageNum: number) => Promise<void>;
}

const useImgStore = create<ImageState>((set) => ({

  imageList: null,

  getSearchImages: async (searchStr: string, pageNum: number) => {
    try {
      // 2. 여기서 받는 함수를 설정하고
      const response =
        await axios.get(`${API_URL}?query=${searchStr}&client_id=${API_KEY}&per_page=${PER_PAGE}&page=${pageNum}`)
      // 2-1. 받으면 이미지 데이터에 넣는 것까지 설정...
      if (response.status === 200) {
        // console.log(response.data);
        set({imageList: response.data.results})
      }
    } catch (error) {
      console.log(error)
    }
  },
}));

export default useImgStore;