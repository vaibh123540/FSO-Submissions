const Info = ({filteredCountries, dataShown, weather}) => {
    if (filteredCountries.length !== 1 || dataShown === null || weather === null) {
        return null
    }

    return (
        <div>
            <h1>{dataShown.name.common}</h1>
            <div>{dataShown.capital.map(c => <div key={c}>Capital {c}</div>)}</div>
            <div>
                Area: {dataShown.area}
            </div>
            <h2>Languages</h2>
            <ul>{Object.values(dataShown.languages).map(l => <li key={l}>{l}</li>)}</ul>
            <img src={dataShown.flags.svg} alt={dataShown.flags.alt} width="150px"/>
            <h2>Weather in {dataShown.name.common}</h2>
            <div>Temperatue {weather.current.temp_c} Celsius</div>
            <img src={weather.current.condition.icon} width="100px"/>
            <div>Wind {weather.current.wind_kph} kp/h</div>
        </div>
    )
}

export default Info