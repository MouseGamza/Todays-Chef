import './App.css';
import Main from './pages/main';
import Nav from './component/nav';
import FindChef from './pages/findChef';
import BeChef from './pages/beChef';
import ChefInfo from './pages/chefInfo';
import Reservation from './pages/reservation';
import Mypage from './pages/mypage';
import LoginOrSignup from './pages/loginOrSignup';
import Footer from './component/footer';
import LogoutModal from './modal/logoutModal';

import { login } from './features/user/user';

import { useDispatch } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';

require('dotenv').config();
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // 로그인 모달창 상태

  const [isLogout, setIsLogout] = useState(false);

  useEffect(() => {
    if (
      window.location.href === 'https://www.todayschef.click' ||
      window.location.href === 'http://www.todayschef.click' ||
      window.location.href === 'http://todayschef.click'
    ) {
      window.location.href = 'https://todayschef.click';
    } // https와 http로 들어갔을 때 redirect 시켜주기

    const authorizationCode = new URL(window.location.href).searchParams.get(
      'code'
    );
    if (authorizationCode) {
      console.log(authorizationCode);
      kakaoSocialLogin(authorizationCode);
    }
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);

  const kakaoSocialLogin = async (authorizationCode) => {
    const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
    try {
      let userResult = await axios.post(`${url}/user/kakao`, {
        authorizationCode: authorizationCode,
      });
      setIsLoginModalOpen(true);

      dispatch(
        login({
          ...userResult.data.userInfo,
          accessToken: userResult.data.accessToken,
        })
      );
    } catch (err) {
      if ((err.response.data.message = 'You Already Signed up')) {
        alert('이미 존재하는 유저입니다');
      } else {
        alert('죄송합니다. 다시 로그인 해주세요.');
      }
    }
  };

  return (
    <BrowserRouter>
      <div className='App'>
        {/* <button onClick={test}>click</button> */}
        {isLogout ? <LogoutModal setIsLogout={setIsLogout} /> : null}
        <Switch>
          <Nav setIsLogout={setIsLogout} />
        </Switch>

        <Route exact path='/'>
          <Main />
        </Route>
        <Route path='/findChef'>
          <FindChef />
        </Route>
        <Route path='/beChef'>
          <BeChef />
        </Route>
        <Route path='/chef'>
          <ChefInfo />
        </Route>
        <Route path='/reservation'>
          <Reservation />
        </Route>
        <Route path='/mypage'>
          <Mypage />
        </Route>
        <Route path='/loginOrSignup'>
          <LoginOrSignup
            isLoginModalOpen={isLoginModalOpen}
            setIsLoginModalOpen={setIsLoginModalOpen}
          />
        </Route>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
