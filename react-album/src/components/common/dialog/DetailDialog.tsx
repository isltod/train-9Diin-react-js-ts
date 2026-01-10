import styles from './DetailDialog.module.scss'
import type {CardDTO} from "@pages/index/types/card.ts";
import {useEffect, useState} from "react";
import 'react-toastify/dist/ReactToastify.css'
import {toast, toastConfig} from "react-simple-toasts";
import 'react-simple-toasts/dist/theme/dark.css'

// 이 toast는 엉망진창...toastify 인가가 좀 나은 거 같긴 한데....
toastConfig({theme: "dark", duration: 500, maxVisibleToasts: 1});

interface Props {
  data: CardDTO;
  handleDetailDialog: (isOpen: boolean) => void;
}

function DetailDialog({ data, handleDetailDialog }: Props) {

  const closeDialog = () => {
    handleDetailDialog(false);
  }

  const [bookmarked, setBookmarked] = useState(false);

  const markStatus = (key : string = 'no-key') => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmark'));
    if (!bookmarks) {
      return "null"
    }
    if (bookmarks.findIndex((item: CardDTO) => item.id === key) === -1) {
      return "no"
    } else {
      return "yes";
    }
  }

  useEffect(() => {
    // 이것도 엄청 헤맸는데, 단순히 내부에서 함수를 만들고 그 안에서 set 호출을 하라는 얘기...
    const initMarkStatus = () => {
      if (markStatus(data.id) === "yes") {
        setBookmarked(true);
      }
    }
    // 단지 중언부언처럼 보이는데 굳이 이렇게 하라는 데에는 뭔 뜻 있을까...
    initMarkStatus();

    // Esc 키 입력했을 때 창 닫기 - 이것도 먼저 함수 만들고, 밖에서 호출하는데 밖은 문서에 등록하는 모양...
    const onEscKeyDown = (event) => {
      if (event.key === "Escape") {
        closeDialog()
      }
    }
    window.addEventListener("keydown", onEscKeyDown);
    // 근데 이건 왜 또 지운다는 거지? 창이 꺼질 때는 지운다는 건가?
    return () => {window.removeEventListener("keydown", onEscKeyDown);}
  }, [])

  const addBookmark = (selected: CardDTO) => {
    if (bookmarked || markStatus(selected.id) === "yes") {
      // 뭔가 너무 좌우로 크고 사라지지도 않는 문제가 있는데...해결이 안된다...
      toast("이미 북마크 된 이미지입니다. ❌");
      return;
    }
    let bookmarks;
    if (markStatus(selected.id) === "no") {
      bookmarks = JSON.parse(localStorage.getItem('bookmark'));
      bookmarks.push(selected);
    } else {
      bookmarks = [selected];
    }
    localStorage.setItem('bookmark', JSON.stringify(bookmarks));
    setBookmarked(true)
    toast("북마크에 추가했습니다. 😄");
    return;
  }

  return (
    <div className={styles.container}>
      <div className={styles.container__dialog}>
        <header className={styles.container__dialog__header}>
          <div className={styles.close}>
            <button className={styles.close__button} onClick={closeDialog}>
              {/*구글 아이콘 사용*/}
              <span className="material-symbols-outlined" style={{fontSize: 28 + 'px'}}>close</span>
            </button>
            <img src={data.user.profile_image.small} alt="작가 프로필 사진" className={styles.close__authorImage}/>
            <span className={styles.close__authorName}>{data.user.name}</span>
          </div>
          <div className={styles.bookmark}>
            <button className={styles.bookmark__button} onClick={() => { addBookmark(data) }}>
              {/*구글 아이콘 사용*/}
              <span className="material-symbols-outlined"
                    style={ bookmarked ?
                      {fontSize: 16 + 'px', color: "red"} :
                      {fontSize: 16 + 'px'}} >
                favorite
              </span>
              북마크
            </button>
            <button className={styles.bookmark__button}>
              <span className="material-symbols-outlined" style={{fontSize: 16 + 'px'}}>download</span>
              다운로드
            </button>
          </div>
        </header>
        <main className={styles.container__dialog__body}>
          <img src={data.urls.small} alt="상세 이미지" className={styles.image}/>
        </main>
        <footer className={styles.container__dialog__footer}>
          <div className={styles.infoBox}>
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>이미지 크기</span>
              <span className={styles.infoBox__item__value}>
                {data.width} X {data.height}
              </span>
            </div>
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>업로드 날자</span>
              <span className={styles.infoBox__item__value}>
                {data.created_at.split('T')[0]}
              </span>
            </div>
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>마지막 업데이트</span>
              <span className={styles.infoBox__item__value}>
                {data.updated_at.split('T')[0]}
              </span>
            </div>
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>다운로드 횟수</span>
              <span className={styles.infoBox__item__value}>{data.likes}</span>
            </div>
          </div>
          <div className={styles.tagBox}>
            <div className={styles.tagBox__tag}>{data.alt_description}</div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default DetailDialog