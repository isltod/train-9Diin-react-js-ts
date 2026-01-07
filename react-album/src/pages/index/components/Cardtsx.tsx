import styles from './Card.module.scss'
import type {CardDTO} from "@pages/index/types/card.ts";

interface Props {
  data: CardDTO;
}

function Card({data}: Props) {

  const openDialog = () => {
    console.log('Card open dialog')
  }

  return (
    <div className={styles.card} onClick={openDialog}>
      <img src={data.urls.small} alt={data.alt_description} className={styles.card__image} />
    </div>
  )
}

export default Card