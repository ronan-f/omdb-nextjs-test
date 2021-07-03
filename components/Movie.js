import { Card, Typography, CardContent, Box, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import TextField from '@material-ui/core/TextField';

const styles = {
    cardRoot: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        minWidth: '200px',
        maxWidth: '875px',
    },
    about: {
        display: 'flex',
        flexDirection: 'column',
        width: '45%'
    },
    poster: {
        height: '300px',
        width: '200px',
    },
    cardContent: {
        display: 'flex',
    },
    userRating: {
        width: '55%',
        paddingLeft: '1rem'
    },
    title: {
        color: 'white',
        width: '100%',
        padding: '0.5rem'
    },
    reviewInput: {
        marginBottom: '1rem',
    }
};

const handleError = (e) => {
    const defaultImgLocation = "/assets/default-poster.jpeg"

    e.target.src = defaultImgLocation
}

const CriticRating = ({ source, value }) => {
    if (source === "Internet Movie Database") source = "IMDb"
    return <>
        <Typography>{source}: {value}</Typography>
    </>
}

const MovieRatings = ({ ratings }) => {

    return ratings.map(rating => {
        return <CriticRating key={rating.Source} source={rating.Source} value={rating.Value} />
    })

}

const UserRatings = ({ classes }) => {
    return <div className={classes.userRating}>
        <div>

            <Typography variant="subtitle1">Rate this movie</Typography>
            <Rating precision={0.5} />
        </div>
        <div>
            <Typography variant="subtitle1">Leave a review</Typography>
            <TextField
                className={classes.reviewInput}
                id="standard-textarea"
                placeholder="Oh what a fantastic movie..."
                multiline
                fullWidth
                rows={10}
                variant="outlined"
            />

        </div>

        <Button variant="contained" color="primary">Submit</Button>

    </div>
}

const Movie = ({ Year, Title, Poster, Runtime, Ratings, Plot, ...props }) => {
    const { classes } = props;
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
                        <Typography color="textSecondary" variant="subtitle1">{Year} - {Runtime}</Typography>
                        <Typography variant="subtitle2">{Plot}</Typography>

                        <MovieRatings ratings={Ratings} />
                    </div>

                </div>

                <UserRatings classes={classes} />

            </CardContent>

        </Card>
    )
}

export default withStyles(styles)(Movie);
