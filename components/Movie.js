import styles from "../styles/Movie.module.css"

export const Movie = ({ Year, Title, Poster }) => {
    return (
        <div>
            <h3 className={styles.title}>Title: {Title}</h3>
            <h3>Year: {Year}</h3>
            <img
                className={styles.poster}
                src={Poster}
                onError={handleError}
                alt="movie poster"
            />
        </div>
    )
}

const handleError = (e) => {
    const defaultImgLocation = "/assets/default-poster.jpeg"

    e.target.src = defaultImgLocation
}
