import { useState } from "react"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { useSearchMovies } from "../hooks/useSearchMovies"
import CircularProgress from "@material-ui/core/CircularProgress"
import { throttle } from "throttle-debounce"

const TIME_BETWEEN_NETWORK_REQUESTS = 300

export default function Asynchronous() {
    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const loading = open && isLoading

    const handleChange = (e) => {
        throttleFunc(e.target.value)
    }

    const handleClose = () => {
        setOpen(false)
        setOptions([])
    }

    const throttleFunc = throttle(
        TIME_BETWEEN_NETWORK_REQUESTS,
        async (searchTerm) => {
            setIsLoading(true)

            if (searchTerm.length < 2) return

            const result = await useSearchMovies(searchTerm)

            setIsLoading(false)

            if (result.success && Array.isArray(result.data)) {
                setOptions(result.data.map((movie) => movie.Title))
            }
        }
    )

    const LoadingIndicator = ({ params }) => (
        <>
            {loading ? <CircularProgress color="inherit" size={20} /> : null}
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

    return (
        <Autocomplete
            style={{ width: 300 }}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            getOptionSelected={(option, value) => option === value}
            getOptionLabel={(option) => option}
            options={options}
            loading={loading}
            onClose={handleClose}
            renderInput={SearchInput}
        />
    )
}
