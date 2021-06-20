import { useState } from "react"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { useSearchMovies } from "../hooks/useSearchMovies"
import CircularProgress from "@material-ui/core/CircularProgress"
import { debounce } from "throttle-debounce"

const TIME_BETWEEN_NETWORK_REQUESTS = 200

export default function Asynchronous() {
    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const loading = open && isLoading

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
            if (searchTerm.length < 2) return

            const result = await useSearchMovies(searchTerm)

            setIsLoading(false)

            if (result.success && Array.isArray(result.data)) {
                const newOptions = result.data.map((movie) => movie.Title)
                setOptions(newOptions)
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
