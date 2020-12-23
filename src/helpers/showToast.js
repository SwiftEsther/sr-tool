import { toast } from "react-toastify";

export const showToast = (type, message) => {
    switch (type) {
        case 'error':
            return(
                toast.error(message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            )
            break;
    
        default:
            break;
    }
}