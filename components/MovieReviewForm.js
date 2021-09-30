import { Card, Typography, CardContent } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import Rating from "@material-ui/lab/Rating"
import TextField from "@material-ui/core/TextField"
import { useState } from "react"
import { useSetReview } from "../hooks/useSetReview"
import { useRouter } from "next/router"
import { pages, errors } from "../constants"
import SubmitButton from "./Buttons/SubmitButton"
import { Alert } from "@material-ui/lab"
import { useToastContext } from "../contexts/ToastContext"
import { handleImgError } from "../utils/handleImgError"
import CriticRatings from "./CriticRatings"

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

    alert: {
        margin: "1rem auto",
        [theme.breakpoints.down("md")]: {
            width: "90%",
        },
    },
})

const ReviewForm = ({ classes, review, movieId, reviewId }) => {
    const router = useRouter()
    const { toastDispatch } = useToastContext()
    const [loading, setLoading] = useState(false)

    const [content, setContent] = useState((review && review.content) || "")
    const [rating, setRating] = useState((review && review.rating) || 0)

    const handleRatingChange = (e) => {
        setRating(Number(e.target.value))
    }

    const handleReviewChange = (e) => {
        setContent(e.target.value)
    }

    const redirect = () => router.push(pages.HOME)

    const handleSubmitReview = async () => {
        if (!rating) {
            return toastDispatch(errors.NO_RATING)
        }
        setLoading(true)
        useSetReview(content, rating, movieId, reviewId)
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
                    value={content}
                    placeholder="Oh what a fantastic movie..."
                    multiline
                    fullWidth
                    rows={5}
                    variant="outlined"
                />
            </div>

            <SubmitButton handleSubmit={handleSubmitReview} loading={loading} />
        </div>
    )
}

const EditAlert = ({ hasReviewed, classes }) => {
    if (!hasReviewed) return null

    return (
        <Alert className={classes.alert}>
            Looks like you've already reviewed this one. Submit again to edit.{" "}
        </Alert>
    )
}

const MovieReviewForm = ({
    Year,
    Title,
    Poster,
    Runtime,
    Ratings,
    Plot,
    review = {},
    imdbID,
    hasReviewed,
    ...props
}) => {
    const { classes } = props

    return (
        <Card className={classes.cardRoot} variant="outlined">
            <EditAlert hasReviewed={hasReviewed} classes={classes} />

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

                        <CriticRatings ratings={Ratings} classes={classes} />
                        <ReviewForm
                            reviewId={review && review.id}
                            movieId={imdbID}
                            review={review}
                            classes={classes}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(MovieReviewForm)
