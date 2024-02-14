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
import { Box, Grid, GridItem } from '@chakra-ui/react';
import Browse from './views/Browse';
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
            <Grid
              templateAreas={`"header" "main" "footer"`}
              templateRows="70px 1fr 60px"
              minHeight="100vh"
              gap={1}
              width="100%"
            >
              <GridItem area={'header'} position={'sticky'} top={0}>
                <Header />
              </GridItem>
              <GridItem area={'main'}>
                <Box mt="25px">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/browse" element={<Browse />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/create-post" element={<AuthGuard><CreatePost /></AuthGuard>} />
                    <Route path="/edit-post/:id" element={<AuthGuard><EditPost /></AuthGuard>} />
                    <Route path="*" element={<NotFound />} />
                    {isAdmin() && <Route path="/admin" element={<AdminDashboard />} />}
                  </Routes>
                </Box>
              </GridItem>
              <GridItem area={'footer'} justifyContent={'center'} textAlign={'center'} position={'sticky'} bottom={0}>
                <Footer />
              </GridItem>
            </Grid>
        </AuthContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App
