import Error from './Error'

const Login = (props) => {
    return (
        <div>
        <h1>log in to application</h1>
        {props.errorMessage !== null && (<Error errorMessage={props.errorMessage}/>)}
        <form onSubmit={props.handleLogin}>
            <div>
                username<input value={props.username} onChange={({target}) => {props.setUsername(target.value)}}/>
            </div>
            <div>
                password<input type="password" value={props.password} onChange={({target}) => {props.setPassword(target.value)}}/>
            </div>
            <button type="Submit">login</button>
        </form>
        </div>
    )
}

export default Login