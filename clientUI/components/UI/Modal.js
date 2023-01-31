import Button from "./button";
import classes from "../../styles/Modal.module.css";

export default function Modal(props) {
  return (
    <div>
      <div className={classes.modal}>
        <h1 className={classes.header}>{props.title}</h1>
        <h2 className={classes.message}>{props.message}</h2>
        <div className={classes.actions}>
          <Button onClick={props.onCancel}>{props.cancelButton}</Button>

          <Button onClick={props.onConfirm}>{props.confirmButton}</Button>
        </div>
      </div>
      <div className={classes.background} onClick={props.onClick}></div>
    </div>
  );
}
