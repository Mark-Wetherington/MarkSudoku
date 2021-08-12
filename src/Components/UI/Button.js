import styles from './Button.module.css'

const Button = (props) => {
    const buttonStyle = styles.button + ' ' + props.className;
  return <button className={buttonStyle} onClick={props.onClick}>{props.children}</button>;
};

export default Button;
