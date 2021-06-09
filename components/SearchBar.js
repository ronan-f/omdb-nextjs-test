import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"
import SearchIcon from "@material-ui/icons/Search"
import { TextField } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"

const SearchBar = ({ handleSearch }) => {
    return (
        <Autocomplete
            id="combo-box-demo"
            options={films}
            onKeyPress={handleSearch}
            autoHighlight
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            renderOption={(option) => <span>{option.title}</span>}
            renderInput={(params) => <TextInput {...params} />}
        />
    )
}

const TextInput = (params) => (
    <TextField
        {...params}
        label="Press enter to search..."
        variant="outlined"
        InputProps={{
            ...params.inputProps,
            endAdornment: (
                <InputAdornment>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                </InputAdornment>
            ),
        }}
    />
)

const films = [] // get these from OMDB

export default SearchBar
