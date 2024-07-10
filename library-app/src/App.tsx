import { useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from './redux/ReduxStore';
import HomePage from './pages/HomePage/HomePage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LayoutPage from './pages/LayoutPage/LayoutPage';
import { fetchUser } from './redux/slices/AuthenticationSlice';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import ResourcePage from './pages/ResourcePage/ResourcePage';

function App() {
  
  const loggedInUser = useSelector((state:RootState) => state.authentication.loggedInUser);
  const dispatch:AppDispatch = useDispatch();

  useEffect(()=>{
    // eslint-disable-next-line prefer-const
    let userId = localStorage.getItem("userId");

    if(userId && !loggedInUser){
      dispatch(fetchUser({
        userId,
        property: 'loggedInUser'
      }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInUser])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route path="" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />}/>
          <Route path="/resource/:barcode" element={<ResourcePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
