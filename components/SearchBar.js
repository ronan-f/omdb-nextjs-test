import { useState } from "react"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { useSearchMovies } from "../hooks/useSearchMovies"
import CircularProgress from "@material-ui/core/CircularProgress"
import { debounce } from "throttle-debounce"
import { useRouter } from "next/router"
import { makeStyles } from "@material-ui/core/styles"

const TIME_BETWEEN_NETWORK_REQUESTS = 200

const useStyles = makeStyles((theme) => ({
    searchBar: {
        width: "300px",
        [theme.breakpoints.down("md")]: {
            margin: "auto",
        },
    },
}))

export default function SearchBar() {
    const [isOpen, setOpen] = useState(false)
    const [options, setOptions] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const classes = useStyles()

    const handleChange = (e) => {
        setIsLoading(true)

        debounceFunc(e.target.value)
    }

    const handleClose = () => {
        debounceFunc.cancel()
        setOpen(false)
        setOptions([])
    }

    const debounceFunc = debounce(
        TIME_BETWEEN_NETWORK_REQUESTS,
        false,
        async (searchTerm) => {
            if (searchTerm.length < 2) return // API needs at least 3 characters to return results

            const result = await useSearchMovies(searchTerm)

            if (result.success && Array.isArray(result.data)) {
                const newOptions = result.data.map((movie) => {
                    return {
                        title: movie.Title,
                        id: movie.imdbID,
                    }
                })
                setOptions(newOptions)
            }

            setIsLoading(false)
        }
    )

    const LoadingIndicator = ({ params }) => (
        <>
            {isOpen && isLoading && (
                <CircularProgress color="inherit" size={20} />
            )}
            {params.InputProps.endAdornment}
        </>
    )

    const SearchInput = (params) => (
        <TextField
            {...params}
            label="Search for a movie..."
            variant="outlined"
            onChange={handleChange}
            InputProps={{
                ...params.InputProps,
                endAdornment: <LoadingIndicator params={params} />,
            }}
        />
    )

    const handleSelectMovie = (value) => {
        router.push(`/movie/${value.id}`)
    }

    return (
        <Autocomplete
            open={isOpen}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            onChange={(_, val) => handleSelectMovie(val)}
            getOptionSelected={(option, value) => option === value}
            getOptionLabel={(option) => option.title}
            options={options}
            className={classes.searchBar}
            loading={isOpen && isLoading}
            onClose={handleClose}
            renderInput={SearchInput}
        />
    )
}
