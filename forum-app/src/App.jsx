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
import UserDetails from './components/Users/UserDetails';
import EditUser from './components/Users/EditUser';
import Post from './views/Post';
import UserPosts from './components/Users/UserPosts';
import Search from './components/Search/Search';
import Drivers from './components/Drivers/Drivers';
import LikedPosts from './components/Users/LikedPosts';

/**
 * The main component of the application.
 *
 * @returns {JSX.Element} The rendered App component.
 */
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

  /**
   * Updates the user data in the context.
   * @param {Object} newUserData - The new user data to be set in the context.
   */
  const updateUserData = (newUserData) => {
    setContext((prevState) => ({
      ...prevState,
      userData: newUserData,
    }));
  };

  /**
   * Checks if the user is an admin.
   * @returns {boolean} True if the user is an admin, false otherwise.
   */
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
            minWidth='100vw'
            gap={1}
          >
            <GridItem area={'header'} position={'sticky'} top={0} zIndex={10}>
              <Header />
            </GridItem>
            <GridItem area={'main'}>
              <Box mt="25px">
                <Routes>
                  <Route path="/" element={<Home updateUserData={updateUserData} />} />
                  <Route path="/home" element={<Home updateUserData={updateUserData} />} />
                  <Route path='/drivers' element={<Drivers />} />
                  <Route path="/browse" element={<Browse />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/create-post" element={<AuthGuard><CreatePost /></AuthGuard>} />
                  <Route path="/edit-post/:id" element={<AuthGuard><EditPost /></AuthGuard>} />
                  <Route path="/post/:id" element={<AuthGuard> <Post updateUserData={updateUserData} /> </AuthGuard>} />
                  <Route path="/user/:id" element={<AuthGuard><UserDetails currentUser={context.userData} /></AuthGuard>} />
                  <Route path="/user/:id/posts" element={<AuthGuard><UserPosts /></AuthGuard>} />
                  <Route path="/user/:id/liked-posts" element={<AuthGuard><LikedPosts /></AuthGuard>} />
                  <Route path="/user/edit" element={<AuthGuard><EditUser userData={context.userData} updateUserData={updateUserData} /></AuthGuard>} />
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
