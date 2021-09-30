import { Card, Typography, CardContent, Box, Button } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import Rating from "@material-ui/lab/Rating"
import TextField from "@material-ui/core/TextField"
import { useEffect, useState } from "react"
import { useSetReview } from "../hooks/useSetReview"
import { useRouter } from "next/router"
import { pages, errors } from "../constants"
import CircularProgress from "@material-ui/core/CircularProgress"
import { Alert } from "@material-ui/lab"
import { useToastContext } from "../contexts/ToastContext"
import { handleImgError } from "../utils/handleImgError"

const styles = (theme) => ({
    cardRoot: {
        margin: "1rem auto",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        minWidth: "200px",
        maxWidth: "875px",
        [theme.breakpoints.down("md")]: {
            margin: 0,
        },
    },
    header: {
        fontSize: "2rem",
        marginBottom: "1rem",
        color: theme.palette.primary.main,
    },
    about: {
        display: "flex",
        justifyContent: "space-between",
        [theme.breakpoints.down("md")]: {
            width: "100%",
            flexDirection: "column",
        },
    },
    poster: {
        marginRight: "1rem",
        border: "1px solid grey",
        [theme.breakpoints.down("md")]: {
            margin: 0,
            marginBottom: "1rem",
        },
    },
    cardContent: {
        display: "flex",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
        },
    },
    userRating: {
        width: "90%",
        [theme.breakpoints.down("md")]: {
            width: "100%",
            paddingLeft: "0",
        },
    },
    title: {
        color: "white",
        width: "100%",
        padding: "0.5rem",
    },
    reviewInput: {
        marginBottom: "1rem",
    },
    spinner: {
        color: "white",
        marginLeft: "1rem",
    },
    critic: {
        display: "block",
        margin: "1rem 0",
        fontWeight: 600,
    },
    alert: {
        margin: "1rem auto",
        [theme.breakpoints.down("md")]: {
            width: "90%",
        },
    },
})

const CriticRating = ({ source, value, classes }) => {
    if (source === "Internet Movie Database") source = "IMDb"
    return (
        <Typography className={classes.critic} variant="body1">
            {source}: {value}
        </Typography>
    )
}

const MovieRatings = ({ ratings, classes }) => {
    return ratings
        .filter((rating) => rating.Source === "Internet Movie Database")
        .map((rating) => {
            return (
                <CriticRating
                    classes={classes}
                    key={rating.Source}
                    source={rating.Source}
                    value={rating.Value}
                />
            )
        })
}

const ReviewForm = ({
    classes,
    review,
    rating,
    setReview,
    setRating,
    movieId,
    reviewId,
}) => {
    const router = useRouter()
    const { toastDispatch } = useToastContext()
    const [loading, setLoading] = useState(false)

    const handleRatingChange = (e) => {
        setRating(Number(e.target.value))
    }

    const handleReviewChange = (e) => {
        setReview(e.target.value)
    }

    const redirect = () => router.push(pages.HOME)

    const handleSubmitReview = async () => {
        if (!rating) {
            return toastDispatch(errors.NO_RATING)
        }
        setLoading(true)
        useSetReview(review, rating, movieId, reviewId)
            .then(redirect)
            .catch(() => toastDispatch(errors.GENERIC))
            .finally(() => setLoading(false))
    }
    return (
        <div className={classes.userRating}>
            <div>
                <Typography variant="subtitle1">Rate this movie</Typography>
                <Rating
                    id="rating"
                    value={rating}
                    name="rating"
                    onChange={handleRatingChange}
                    precision={0.5}
                />
            </div>
            <div>
                <Typography variant="subtitle1">Leave a review</Typography>
                <TextField
                    className={classes.reviewInput}
                    id="review"
                    onChange={handleReviewChange}
                    value={review}
                    placeholder="Oh what a fantastic movie..."
                    multiline
                    fullWidth
                    rows={5}
                    variant="outlined"
                />
            </div>

            <Button
                onClick={handleSubmitReview}
                variant="contained"
                color="primary"
                disabled={loading}
            >
                Submit
                {loading && (
                    <CircularProgress size={20} className={classes.spinner} />
                )}
            </Button>
        </div>
    )
}

const Movie = ({
    Year,
    Title,
    Poster,
    Runtime,
    Ratings,
    Plot,
    review = {},
    imdbID,
    ...props
}) => {
    const { classes } = props

    const [reviewContent, setReviewContent] = useState("")
    const [rating, setRating] = useState(0)
    const [hasReviewed, setHasReviewed] = useState(false)

    useEffect(() => {
        if (review && review.rating) {
            setReviewContent(review.content)
            setRating(review.rating)
            setHasReviewed(true)
        }
    }, [review])

    return (
        <Card className={classes.cardRoot} variant="outlined">
            {hasReviewed && (
                <Alert className={classes.alert}>
                    Looks like you've already reviewed this one. Submit again to
                    edit.{" "}
                </Alert>
            )}

            <CardContent className={classes.cardContent}>
                <div className={classes.about}>
                    <img
                        className={classes.poster}
                        src={Poster}
                        onError={handleImgError}
                        alt={`Movie poster for ${Title}`}
                    />

                    <div>
                        <Typography className={classes.header} variant="h1">
                            {Title} ({Year})
                        </Typography>
                        <Typography variant="body1">{Plot}</Typography>

                        <MovieRatings ratings={Ratings} classes={classes} />
                        <ReviewForm
                            reviewId={review && review.id}
                            movieId={imdbID}
                            review={reviewContent}
                            rating={rating}
                            setReview={setReviewContent}
                            setRating={setRating}
                            classes={classes}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(Movie)
