// client_ID = '207130399105-liobtrmdselqr1um3qe1188d2c2djnrn.apps.googleusercontent.com'
// client_SECRET = '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'

const LoginPage = () => {
  // const params = {
  //   client_id:
  //     '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',
  //   redirect_uri: 'http://localhost:3000/',
  //   response_type: 'token',
  //   scope:
  //     // 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
  //     'https://www.googleapis.com/auth/userinfo.profile',
  //   include_granted_scopes: 'true',
  //   state: 'pass-through value',
  // };

  // const oauth2Endpoint = `https://accounts.google.com/o/oauth2/v2/auth?scope=${params.scope}&include_granted_scopes=${params.include_granted_scopes}&response_type=${params.response_type}&state=${params.state}&redirect_uri=${params.redirect_uri}&client_id=${params.client_id}`;

  return (
    // MUST USE A FORM HERE, OTHERWISE WILL RUN INTO CORS ERROR
    // https://stackoverflow.com/questions/72382892/access-to-fetch-at-https-accounts-google-com-o-oauth2-v2-auth-has-been-blocked
    <form action="http://localhost:3000/" method="get">
      <input type="submit" value="Press to log in" />
    </form>
  );
};

export default LoginPage;
