import {toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
const toastifySuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  const toastifyError = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
  }

  const Confirm = (title, message, DeleteList, index) => {
    confirmAlert({
      title: title,
      message: message,
      buttons: [
        {
          label: 'Yes',
          onClick: () => DeleteList(index)
        },
        {
          label: 'No',
          onClick: () => {return}
        }
      ]
    });

}

const toastifyWarning = (message) => {
  toast.warn(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}

  export {
    toastifySuccess,
    toastifyWarning,
    toastifyError,
    Confirm
  }