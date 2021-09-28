import { Card, Typography, CardContent, Box, Button } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import Rating from "@material-ui/lab/Rating"
import TextField from "@material-ui/core/TextField"
import { useEffect, useState } from "react"
import { useSetReview } from "../hooks/useSetReview"
import Toast from "./Toast"
import { useRouter } from "next/router"
import { pages } from "../constants"
import CircularProgress from "@material-ui/core/CircularProgress"

const styles = (theme) => ({
    cardRoot: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        minWidth: "200px",
        maxWidth: "875px",
    },
    about: {
        display: "flex",
        flexDirection: "column",
        width: "45%",
        [theme.breakpoints.down("md")]: {
            width: "100%",
        },
    },
    poster: {
        height: "300px",
        width: "200px",
    },
    cardContent: {
        display: "flex",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
        },
    },
    userRating: {
        width: "55%",
        paddingLeft: "1rem",
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
})

const handleError = (e) => {
    const defaultImgLocation = "/assets/default-poster.jpeg"

    e.target.src = defaultImgLocation
}

const CriticRating = ({ source, value }) => {
    if (source === "Internet Movie Database") source = "IMDb"
    return (
        <>
            <Typography>
                {source}: {value}
            </Typography>
        </>
    )
}

const MovieRatings = ({ ratings }) => {
    return ratings.map((rating) => {
        return (
            <CriticRating
                key={rating.Source}
                source={rating.Source}
                value={rating.Value}
            />
        )
    })
}

const UserRatings = ({
    classes,
    review,
    rating,
    setReview,
    setRating,
    movieId,
    reviewId,
    setShowErrorToast,
    redirect,
    loading,
    setLoading,
}) => {
    const handleRatingChange = (e) => {
        setRating(Number(e.target.value))
    }

    const handleReviewChange = (e) => {
        setReview(e.target.value)
    }

    const handleSubmitReview = async () => {
        setLoading(true)
        useSetReview(review, rating, movieId, reviewId)
            .then(redirect)
            .catch(() => setShowErrorToast(true))
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
                    rows={10}
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
    const [showErrorToast, setShowErrorToast] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (review) {
            setReviewContent(review.content)
            setRating(review.rating)
        }
    }, [review])

    const redirect = () => router.push(pages.HOME)

    return (
        <Card className={classes.cardRoot} variant="outlined">
            <Box className={classes.title} bgcolor="primary.main">
                <Typography variant="h3">{Title}</Typography>
            </Box>

            <CardContent className={classes.cardContent}>
                <div className={classes.about}>
                    <img
                        className={classes.poster}
                        src={Poster}
                        onError={handleError}
                        alt={`Movie poster for ${Title}`}
                    />
                    <div>
                        <Typography color="textSecondary" variant="subtitle1">
                            {Year} - {Runtime}
                        </Typography>
                        <Typography variant="subtitle2">{Plot}</Typography>

                        <MovieRatings ratings={Ratings} />
                    </div>
                </div>

                <UserRatings
                    reviewId={review && review.id}
                    movieId={imdbID}
                    review={reviewContent}
                    rating={rating}
                    setReview={setReviewContent}
                    setRating={setRating}
                    classes={classes}
                    setShowErrorToast={setShowErrorToast}
                    redirect={redirect}
                    loading={loading}
                    setLoading={setLoading}
                />

                <Toast
                    open={showErrorToast}
                    state="error"
                    message="Hmm. Something went wrong when saving. Try again."
                    onClose={() => setShowErrorToast(false)}
                />
            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(Movie)
