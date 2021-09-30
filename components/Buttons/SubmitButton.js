import { Button, CircularProgress } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() => ({
    spinner: {
        color: "white",
        marginLeft: "1rem",
    },
}))

const SubmitButton = ({ handleSubmit, loading }) => {
    const classes = useStyles()

    return (
        <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={loading}
        >
            Submit
            {loading && (
                <CircularProgress size={20} className={classes.spinner} />
            )}
        </Button>
    )
}

export default SubmitButton
