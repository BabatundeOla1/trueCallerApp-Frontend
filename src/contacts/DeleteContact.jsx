import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import styles from './DeleteContact.module.css'

export default function DeleteContact({ phoneNumber, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the contact permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff6b6b",
      cancelButtonColor: "#7289da",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {

      if (result.isConfirmed) {
        try {

          const response = await fetch(`http://localhost:8080/contact/deleteContact/${phoneNumber}`, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            }
          );
           
          if (!response.ok) {
            throw new Error("Failed to delete contact from server");
          }

          Swal.fire({
            icon: "success",
            title: "Deleted",
            text: "Contact has been deleted successfully.",
          });

          if (onDelete) onDelete(); 
          navigate("/contact");
        } catch (error) {
          console.error("Error deleting contact:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete from server.",
          });
        }
      }
    });
  };

  return (
    <button onClick={handleDelete} className={styles.deleteButton}>
      Delete
    </button>
  );
}
