import CommonHeader from '@components/common/header/CommonHeader';
import CommonSearchBar from "@components/common/searchBar/CommonSearchBar.tsx";
import CommonNav from "@components/common/navigation/CommonNav.tsx";
import CommonFooter from "@components/common/footer/CommonFooter.tsx";
import styles from './styles/index.module.scss'
import useImgStore from "@store/imgStore.ts";
import {useEffect, useMemo, useState} from "react";
import type {CardDTO} from "@pages/index/types/card.ts";
import Card from "@pages/index/components/Cardtsx.tsx";
import DetailDialog from "@components/common/dialog/DetailDialog.tsx";
import Loading from "@pages/index/components/Loading.tsx";

function index() {

  // index는 특별하다면서, 소문자로 시작하니 아래 use...훅에서 죄다 빨간줄이다...
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {imageList, getSearchImages, isLoading} = useImgStore();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [imgData, setimgData] = useState<CardDTO>();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getSearchImages();
  }, []);

  // 애초에 되도않는 recoil 때문에 많이도 돌아왔고...
  // 이 비러먹을 상황 때문에 엄청 고생했다...비동기 처리이므로 imgData && 로 데이터 로딩 이후 처리하도록 한다고...
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const CARD_LIST = useMemo(() => {
    if (isLoading) {
      // 뭔가 리코일과 달라서 그런지...여기서 로딩 화면 표시는 실패...
      return <Loading />
    }
    if (imageList) {
      return imageList.map((item: CardDTO) => {
        return <Card data={item} key={item.id} handleDetailDialog={setOpen} handleSetImage={setimgData} />
      })
    }
  }, [imageList, isLoading]);


  return (
    <div className={styles.page}>
      {/*공통 헤더 UI 부분*/}
      <CommonHeader/>
      {/*공통 네비게이션 UI 부분*/}
      <CommonNav/>
      <div className={styles.page__contents}>
        <div className={styles.page__contents__introBox}>
          <div className={styles.wrapper}>
            <span className={styles.wrapper__title}>
              PhotoSplash
            </span>
            <span className={styles.wrapper__desc}>
              인터넷 시각 자료 출처입니다.<br/>
              모든 지역에 있는 크리에이터들의 지원을 받습니다.
            </span>
            {/*검색창 UI 부분*/}
            <CommonSearchBar/>
          </div>
        </div>
        <div className={styles.page__contents__imageBox}>
          {CARD_LIST}
        </div>
      </div>
      {/*공통 푸터 UI 부분*/}
      <CommonFooter/>
      {open && <DetailDialog handleDetailDialog={setOpen} data={imgData} />}
    </div>
  )
}

export default index