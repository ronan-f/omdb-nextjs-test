import { makeStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"

const useStyles = makeStyles(() => ({
    critic: {
        display: "block",
        margin: "1rem 0",
        fontWeight: 600,
    },
}))

const Rating = ({ source, value }) => {
    const classes = useStyles()

    if (source === "Internet Movie Database") source = "IMDb"

    return (
        <Typography className={classes.critic} variant="body1">
            {source}: {value}
        </Typography>
    )
}

const CriticRatings = ({ ratings }) => {
    return ratings
        .filter((rating) => rating.Source === "Internet Movie Database")
        .map((rating) => {
            return (
                <Rating
                    key={rating.Source}
                    source={rating.Source}
                    value={rating.Value}
                />
            )
        })
}

export default CriticRatings
