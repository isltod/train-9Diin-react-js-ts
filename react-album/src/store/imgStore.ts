import { create } from 'zustand';
import axios from 'axios';

const API_URL = "https://api.unsplash.com/search/photos"
const API_KEY = "98IZBgfB7oilX6BeswvQeMOQs4YMYbkjgGyOZuHh5ig"
const PER_PAGE = 30

interface ImageState {
  imageList: [];
  searchString: string;
  setSearchString: (value: string) => void;
  pageNumber: number;
  setPageNumber: (value: number) => void;
  getSearchImages: () => Promise<void>;
}

const useImgStore =
  create<ImageState>(
    (set, get) => ({

  imageList: null,
  searchString: "dogs",
  pageNumber: 1,

  setSearchString: (value : string) => {
    set({searchString: value})
  },

  setPageNumber: (value : number) => {
    set({pageNumber: value})
  },

  getSearchImages: async () => {
    try {
      // 내부 상태값은 이런 식으로 받아와야 하나보다...
      const searchStr = get().searchString;
      const pageNum = get().pageNumber;

      // 데이터 비동기로 받고
      const response =
        await axios.get(`${API_URL}?query=${searchStr}&client_id=${API_KEY}&per_page=${PER_PAGE}&page=${pageNum}`)
      // 받으면 이미지 데이터에 넣는 것까지 설정...
      if (response.status === 200) {
        set({imageList: response.data.results})
      }
    } catch (error) {
      console.log(error)
    }
  },
}));

export default useImgStore;