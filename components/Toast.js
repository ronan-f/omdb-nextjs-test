import { Snackbar } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import isMobile from "../utils/isMobile"

const Toast = ({ open, state = "success", message, onClose }) => {
    let anchor = { vertical: "bottom", horizontal: "center" }
    if (isMobile()) {
        anchor.vertical = "top"
    }
    return (
        <Snackbar
            anchorOrigin={anchor}
            open={open}
            autoHideDuration={3000}
            onClose={onClose}
        >
            <Alert severity={state} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default Toast
