import { useGoogleLogin } from '@react-oauth/google';

const GoogleSignInButton = ({ handleGoogleSignIn }) => {
  const login = useGoogleLogin({
      onSuccess: tokenResponse => handleGoogleSignIn(tokenResponse),
  });
  return (
      <button onClick={() => login()}>Sign in with Google</button>
  );
};
export default GoogleSignInButton;