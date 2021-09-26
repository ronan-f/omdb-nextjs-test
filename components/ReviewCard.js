import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import Box from "@material-ui/core/Box"
import CardContent from "@material-ui/core/CardContent"
import Rating from "@material-ui/lab/Rating"
import Typography from "@material-ui/core/Typography"
import Avatar from "@material-ui/core/Avatar"

const useStyles = makeStyles(() => {
    return {
        root: {
            maxWidth: 550,
            minWidth: "40vw",
            display: "flex",
            flexDirection: "column",
            marginTop: "1rem",
            overflow: "wrap",
        },
        info: {
            display: "flex",
            flexDirection: "column",
        },
        main: {
            display: "flex",
        },
        metadata: {
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            color: "white",
        },
        metadataContainer: {
            paddingLeft: "1rem",
        },
    }
})

const Review = ({ review }) => {
    return (
        <CardContent>
            <Typography variant="body1" component="p">
                {review}
            </Typography>
        </CardContent>
    )
}

const MetaData = ({ username, postedAt }) => {
    const classes = useStyles()

    return (
        <Box className={classes.metadata} bgcolor="primary.main">
            <Avatar
                alt="Steve Jobs"
                src="https://www.glassdoor.com/blog/app/uploads/sites/2/jobs.jpg"
            />
            <div className={classes.metadataContainer}>
                <Typography variant="body1" component="p" color="inherit">
                    {username}
                </Typography>
                <Typography variant="body1" component="p" color="inherit">
                    {postedAt}
                </Typography>
            </div>
        </Box>
    )
}

const MovieInfo = ({ movie, rating }) => {
    const classes = useStyles()

    return (
        <CardContent className={classes.info}>
            <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
            >
                {movie.Title}
            </Typography>
            <Rating name="read-only" value={rating} readOnly />
            <img
                height="180px"
                width="120px"
                src={movie.Poster}
                alt="Movie poster"
            />
        </CardContent>
    )
}

const ReviewCard = ({ content, movie, rating, author, created_at }) => {
    const classes = useStyles()

    return (
        <Card className={classes.root} variant="outlined">
            <MetaData username={author.email} postedAt={created_at} />
            <div className={classes.main}>
                <MovieInfo movie={movie} rating={rating} />
                <Review review={content} />
            </div>
        </Card>
    )
}

export default ReviewCard
