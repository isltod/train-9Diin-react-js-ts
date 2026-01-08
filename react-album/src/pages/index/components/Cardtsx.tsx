import styles from './Card.module.scss'
import type {CardDTO} from "@pages/index/types/card.ts";

// 요게 Props와 event로 데이터 통신하는 부분...
interface Props {
  data: CardDTO;
  openDetailDialog: (isOpen: boolean) => void;
}

function Card({data, openDetailDialog}: Props) {

  const openDialog = () => {
    console.log('Card open dialog')
    // 이건 사실상 setOpen에 연결되어 있어서 open state를 true로 변경시켜주는 효과...
    openDetailDialog(true)
  }

  return (
    <div className={styles.card} onClick={openDialog}>
      <img src={data.urls.small} alt={data.alt_description} className={styles.card__image} />
    </div>
  )
}

export default Card