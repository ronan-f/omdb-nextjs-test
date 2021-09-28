import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Rating from "@material-ui/lab/Rating"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles((theme) => {
    return {
        root: {
            border: `1px solid ${theme.palette.primary.main}`,
            maxWidth: 550,
            minWidth: "40vw",
            display: "flex",
            flexDirection: "column",
            overflow: "wrap",
            margin: "1rem auto",
            boxShadow:
                "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;",
            [theme.breakpoints.down("md")]: {
                maxWidth: "95vw",
            },
            [theme.breakpoints.up("md")]: {
                maxWidth: 550,
            },
        },
        info: {
            display: "flex",
            flexDirection: "column",
            width: "30%",
            [theme.breakpoints.down("md")]: {
                width: "35%",
            },
        },
        main: {
            display: "flex",
        },
        metadata: {
            color: "grey",
            overflowWrap: "anywhere",
        },
        metadataContainer: {
            paddingLeft: "1rem",
        },
        rating: {
            marginLeft: "-3px",
        },
        movieImg: {
            border: `1px solid lightgrey`,
        },
    }
})

const Review = ({ review, username, postedAt, rating }) => {
    const classes = useStyles()

    return (
        <CardContent>
            <MetaData username={username} postedAt={postedAt} />
            <Rating
                className={classes.rating}
                precision={0.5}
                name="read-only"
                value={rating}
                readOnly
            />

            <Typography variant="body1" component="p">
                {review}
            </Typography>
        </CardContent>
    )
}

const MetaData = ({ username, postedAt }) => {
    const classes = useStyles()

    return (
        <Typography className={classes.metadata} variant="body1" component="p">
            {username} - {postedAt}
        </Typography>
    )
}

const MovieInfo = ({ movie }) => {
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
            <img
                className={classes.movieImg}
                height="180px"
                width="120px"
                src={movie.Poster}
                alt="Movie poster"
            />
        </CardContent>
    )
}

const ReviewCard = ({ content, movie, rating, author, updated_at }) => {
    const classes = useStyles()

    const username = author.username || author.nickname || author.email

    return (
        <Card className={classes.root} variant="outlined">
            <div className={classes.main}>
                <MovieInfo movie={movie} rating={rating} />
                <Review
                    username={username}
                    postedAt={updated_at}
                    review={content}
                    rating={rating}
                />
            </div>
        </Card>
    )
}

export default ReviewCard
