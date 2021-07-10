import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import SigninScreen from './screens/SigninScreen';
import BookSlot from './screens/BookSlot';
import SlotList from './screens/SlotList';
import GamesList from './screens/GamesList';
import AddGame from './screens/AddGame';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  
 return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              VPlay
            </Link>
          </div>
          <div>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/addgame">Add game</Link>
                  </li>
                  <li>
                    <Link to="/gamelist">Update/Delete game</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
       
        <main>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <PrivateRoute path='/bookslot' component={BookSlot}></PrivateRoute>
          <PrivateRoute path='/slotlist' component={SlotList}></PrivateRoute>
         
          <AdminRoute
            path="/gamelist"
            component={GamesList} exact
        ></AdminRoute> 
       <AdminRoute
            path="/addgame"
            component={AddGame}
        ></AdminRoute> 
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">
          {userInfo && !userInfo.isAdmin}
          <div>All right reserved</div>{' '}
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
