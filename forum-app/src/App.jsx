import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import NotFound from './views/NotFound';
import Home from './views/Home';
import Header from './components/Header';
import CreatePost from './views/CreatePost';

function App() {
  const [context, setContext] = useState({
    user: null,
    userData: null,
  });

  return (
    <>
      <BrowserRouter>
        <AppContext.Provider value={{ ...context, setContext }}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App
