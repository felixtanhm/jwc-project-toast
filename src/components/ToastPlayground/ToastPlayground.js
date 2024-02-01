import React from "react";

import Button from "../Button";
import ToastShelf from "../ToastShelf";
import { ToastContext } from "../ToastProvider";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [message, setMessage] = React.useState("");
  const [selectedVariant, setSelectedVariant] = React.useState("notice");
  const { toasts, createToast, closeToast } = React.useContext(ToastContext);

  function handleSubmit(e) {
    e.preventDefault();
    createToast(message, selectedVariant);
    setMessage("");
    setSelectedVariant("notice");
  }

  function handleClose(e) {
    closeToast(e.target.id);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      <ToastShelf toasts={toasts} onClose={handleClose} />

      <form className={styles.controlsWrapper} onSubmit={handleSubmit}>
        {/* Message Input */}
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              value={message}
            />
          </div>
        </div>
        {/* Variant Radio Buttons */}
        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((variant) => {
              const id = "variant-" + variant;
              return (
                <label key={id} htmlFor={id}>
                  <input
                    id={id}
                    type="radio"
                    name="variant"
                    value={variant}
                    checked={variant === selectedVariant}
                    onChange={(event) => setSelectedVariant(event.target.value)}
                  />
                  {variant}
                </label>
              );
            })}
          </div>
        </div>
        {/* Submit Button */}
        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
