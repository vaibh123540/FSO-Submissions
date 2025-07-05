const Result = ({filteredCountries, setCountry}) => {

    if (filteredCountries.length === 1 || filteredCountries.length === 0) {
        return (
            null
        )
    }

    else if (filteredCountries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }

    return (
        <div>
            {filteredCountries.map(c => <div key={c}> {c} <button onClick={() => setCountry(c)}>Show</button> </div>)}
        </div>
    )
}

export default Result