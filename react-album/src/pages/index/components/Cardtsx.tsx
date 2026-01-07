import styles from './Card.module.scss'

function Card() {

  const openDialog = () => {
    console.log('Card open dialog')
  }
  return (
    <div className={styles.card} onClick={openDialog}>
      <img src="#" alt="image card" className={styles.card__image} />
    </div>
  )
}

export default Card