import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Forget from './pages/Forget';
import Reset from './pages/Reset';
import SingleMovie from './pages/Booking/SingleMovie';
import BookShow from './pages/Booking/BookShow';
import ProtectedRoute from './components/ProtectedRoute';
import { Provider } from "react-redux";
import store from "./redux/store";
import Admin from './pages/Admin';
import Partner from './pages/Partner';
import Profile from './pages/User';

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <ProtectedRoute> <Home></Home> </ProtectedRoute> }></Route>
            <Route path='/admin' element={ <ProtectedRoute> <Admin></Admin> </ProtectedRoute> }></Route>
            <Route path='/partner' element={ <ProtectedRoute> <Partner></Partner> </ProtectedRoute> }></Route>
            <Route path='/profile' element={ <ProtectedRoute> <Profile></Profile> </ProtectedRoute>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/register' element={<Register></Register>}></Route>
            <Route path='/forget' element={<Forget></Forget>}></Route>
            <Route path='/reset' element={<Reset></Reset>}></Route>
            <Route path='/movie/:id' element={ <ProtectedRoute><SingleMovie></SingleMovie></ProtectedRoute> }></Route>
            <Route path='/book-show/:id' element={ <ProtectedRoute><BookShow></BookShow></ProtectedRoute>}></Route>
          </Routes>
        </BrowserRouter>  
      </Provider>
    </div>
  );
}

export default App;
