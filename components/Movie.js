import { Card, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    cardRoot: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '200px',
        margin: '16px',
        padding: '18px',
    },
    about: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '16px',
    },
    poster: {
        height: '300px',
        width: '200px',
    },
};

const handleError = (e) => {
    const defaultImgLocation = "/assets/default-poster.jpeg"

    e.target.src = defaultImgLocation
}

const Movie = ({ Year, Title, Poster, ...props }) => {
    const { classes } = props;
    return (
        <Card className={classes.cardRoot}>
            <img
                className={classes.poster}
                src={Poster}
                onError={handleError}
                alt={`Movie poster for ${Title}`}
            />
            <div className={classes.about}>
                <Typography variant="h6">{Title}</Typography>
                <Typography variant="h6">{Year}</Typography>
            </div>
        </Card>
    )
}

export default withStyles(styles)(Movie);
