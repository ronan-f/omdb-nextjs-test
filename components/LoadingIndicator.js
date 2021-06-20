import { CircularProgress, makeStyles } from "@material-ui/core"

const useStyles = makeStyles(() => ({
    fullScreen: {
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}))

export const LoadingIndicator = ({ fullScreen }) => {
    const classes = useStyles()

    return (
        <div className={fullScreen && classes.fullScreen}>
            <CircularProgress />
        </div>
    )
}
