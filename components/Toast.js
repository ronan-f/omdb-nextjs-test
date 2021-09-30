import { Snackbar } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import isMobile from "../utils/isMobile"
import { useToastContext, REMOVE } from "../contexts/ToastContext"

const ToastList = ({ toastList }) => {
    return toastList.map((toast) => <Toast key={toast.id} payload={toast} />)
}

const Toast = ({ payload }) => {
    const { toastDispatch } = useToastContext()

    const onClose = (id) => {
        toastDispatch({ type: REMOVE, payload: { id } })
    }

    const toastPosition = getToastPosition()

    return (
        <Snackbar
            key={payload.id}
            anchorOrigin={toastPosition}
            open={true}
            autoHideDuration={3000}
            onClose={() => onClose(payload.id)}
        >
            <Alert severity={payload.severity} sx={{ width: "100%" }}>
                {payload.content}
            </Alert>
        </Snackbar>
    )
}

const getToastPosition = () => {
    let anchor = { vertical: "bottom", horizontal: "center" }

    if (isMobile()) {
        anchor.vertical = "top"
    }

    return anchor
}

export default ToastList
