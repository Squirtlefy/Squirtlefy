const LoginPage = () => {
  return (
    // MUST USE A FORM HERE, OTHERWISE WILL RUN INTO CORS ERROR
    // https://stackoverflow.com/questions/72382892/access-to-fetch-at-https-accounts-google-com-o-oauth2-v2-auth-has-been-blocked
    <div className="form-container">
    <form className="form" action="http://localhost:3000/" method="get">
      <input type="submit" value="Press me!" />
    </form>
    </div>
  );
};

export default LoginPage;
