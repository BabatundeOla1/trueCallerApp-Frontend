import React from "react";
import Swal from "sweetalert2";
import styles from "./Block.module.css";

export default function BlockAndUnblockContact({ phoneNumber, isBlocked, onBlockToggle }) {
  const handleBlockToggle = async () => {

    if (isBlocked) {
      Swal.fire({
        icon: "info",
        title: "Contact is already blocked",
        text: "This contact is already blocked.",
      });
      return;
    }


    Swal.fire({
      title: `Are you sure you want to block this contact?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d9534f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: `Block`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:8080/contact/block/${phoneNumber}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
          });

          if (!response.ok) {
            throw new Error(`Failed to block contact`);
          }

          Swal.fire({
            icon: "success",
            title: `Contact Blocked successfully.`,
          });

          onBlockToggle();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `Failed to block contact. Try again.`,
          });
        }
      }
    });
  };

  return (
    <button className={styles.blockButton} onClick={handleBlockToggle}>
      Block
    </button>
  );
}
