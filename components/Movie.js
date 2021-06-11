import styles from "../styles/Movie.module.css"
import Typography from '@material-ui/core/Typography';

export const Movie = ({ Year, Title, Poster }) => {
    return (
        <div>
            <Typography variant="h6" className={styles.title}>{Title}</Typography>
            <Typography variant="h6">{Year}</Typography>
            <img
                className={styles.poster}
                src={Poster}
                onError={handleError}
                alt={`Movie poster for ${Title}`}
            />
        </div>
    )
}

const handleError = (e) => {
    const defaultImgLocation = "/assets/default-poster.jpeg"

    e.target.src = defaultImgLocation
}
