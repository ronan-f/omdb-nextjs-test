export const Movie = ({ imdbId, Year, Title, Poster }) => {
    return (
        <div key={imdbId}>
            <h3>Title: {Title}</h3>
            <h3>Year: {Year}</h3>
            <img src={Poster} alt="movie poster" />
        </div>
    )
}
