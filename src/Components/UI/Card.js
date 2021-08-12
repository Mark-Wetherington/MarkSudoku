import styles from './Card.module.css'

const Card = (props) => {
    const cardStyle = styles.card + ' ' + props.className;
  return <div className={cardStyle}>{props.children}</div>;
};

export default Card;
