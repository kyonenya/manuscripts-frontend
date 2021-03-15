import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import firebase from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Manuscripts } from './Manuscripts';

export const Auth = () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [idToken, setIdToken] = useState('');

  useEffect(() => {
    if (!user) return;
    user.getIdToken(true).then((idToken) => setIdToken(idToken));
  }, [user]);

  const handleLogin = (): Promise<firebase.auth.UserCredential> => firebase.auth().signInWithEmailAndPassword(email, password);

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (!user) {
    return (
      <Fragment>
        <input type="email" placeholder="email..."
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <input type="password" placeholder="password..."
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <button onClick={handleLogin}>Log in</button>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <Manuscripts
        idToken={idToken}
      />
      <p>Current User: {user.email}</p>
      <button
        onClick={() => firebase.auth().signOut()}
      >
        Log out
      </button>
    </Fragment>
  );
};
