import { Snackbar } from "@material-ui/core"
import { Alert } from "@material-ui/lab"

const Toast = ({ open, state = "success", message, onClose }) => {
    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
            <Alert severity={state} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default Toast
