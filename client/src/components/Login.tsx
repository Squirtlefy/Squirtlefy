const Login = () => {
  return (
    <button onClick={async () => {
       const response = await fetch('https://accounts.google.com/o/oauth2/v2/auth', {
            method: 'GET',
            mode: 'no-cors',
        });
        console.log(response)
        // const data = response.json();
        // console.log(data);
    }}/>
  )
}

export default Login