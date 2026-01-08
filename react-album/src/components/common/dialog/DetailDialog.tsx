import styles from './DetailDialog.module.scss'
import type {CardDTO} from "@pages/index/types/card.ts";

interface Props {
  data: CardDTO;
  handleDetailDialog: (isOpen: boolean) => void;
}

function DetailDialog({ data, handleDetailDialog }: Props) {

  const closeDialog = () => {
    handleDetailDialog(false);
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
            <button className={styles.bookmark__button}>
              {/*구글 아이콘 사용*/}
              <span className="material-symbols-outlined" style={{fontSize: 16 + 'px'}}>close</span>
              북마크
            </button>
            <button className={styles.bookmark__button}>
              <span className="material-symbols-outlined" style={{fontSize: 16 + 'px'}}>close</span>
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