import { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import NotFound from './views/NotFound';
import Home from './views/Home';
import Header from './components/Header/Header';
import CreatePost from './views/CreatePost';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase-config';
import { getUserData } from './services/users.service';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import AdminDashboard from './components/Admin/AdminDashboard';
import AuthGuard from './hoc/AuthGuard';
import { Grid } from '@chakra-ui/react';
import EditPost from './views/EditPost';

function App() {
  const [context, setContext] = useState({
    user: null,
    userData: null,
  });

  const [user] = useAuthState(auth);

  if (context.user !== user) {
    setContext({ user });
  }

  useEffect(() => {
    if (user === null) return;
  
    getUserData(user.uid)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          throw new Error('User data not found!');
        }
        setContext({ user, userData: snapshot.val()[Object.keys(snapshot.val())[0]] });
      })
  }, [user]);

  const isAdmin = () => {
    return context.userData?.role === 'admin';
  }

  return (
    <>
      <BrowserRouter>
        <AuthContext.Provider value={{ ...context, setUser: setContext }}>
          <Grid templateRows="auto 1fr auto" minHeight="100vh">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/create-post" element={<AuthGuard><CreatePost /></AuthGuard>} />
              <Route path="/edit-post/:id" element={<AuthGuard><EditPost /></AuthGuard>} />
              <Route path="*" element={<NotFound />} />
              {isAdmin() && <Route path="/admin" element={<AdminDashboard />} />}
            </Routes>
            <Footer />
          </Grid>
        </AuthContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App
