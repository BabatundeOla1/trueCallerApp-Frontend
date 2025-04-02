import React from "react";
import Swal from "sweetalert2";
import styles from "./UnblockContact.module.css";

export default function UnblockContact({ phoneNumber, isBlocked, onBlockToggle }) {
  const handleUnblock = async () => {
    if (!isBlocked) {
      return;
    }

    Swal.fire({
      title: "Are you sure you want to unblock this contact?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745", 
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, unblock it!",

    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:8080/contact/unblock/${phoneNumber}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
          });

          if (!response.ok) {
            throw new Error("Failed to unblock contact");
          }

          Swal.fire({
            icon: "success",
            title: "Contact unblocked successfully.",
          });

          onBlockToggle();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to unblock the contact. Try again.",
          });
        }
      }
    });
  };

  return (
    <button className={styles.blockButton} onClick={handleUnblock}>
      Unblock
    </button>
  );
}
