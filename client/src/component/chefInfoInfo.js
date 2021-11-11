import {
  ChefAllInformation,
  ChefImgWrap,
  ChefTextWrap,
} from '../styled/styleChefInfo';
import basic_profile from '../todaysChefIMG/basic_profile.jpeg';
import axios from 'axios';

require('dotenv').config();
axios.defaults.withCredentials = true;

function ChefInfoDesc() {
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  // axios로 셰프 개인정보 요청하기
  // 받아온 개인정보로 #chefName, #chefImg, #chefsGreeting,... 채워주기

  return (
    <ChefAllInformation>
      <div id='chefInfoAll'>
        <ChefImgWrap>
          <div id='chefName'>
            <h2>김코딩 셰프</h2>
          </div>
          <div id='chefImg'>
            <img src={basic_profile} alt='셰프 사진' />
          </div>
        </ChefImgWrap>

        <ChefTextWrap>
          <div id='chefsGreeting'>
            <h3>Greetings</h3>
            <p>셰프의 인삿말</p>
          </div>
          <div id='chefsCareer'>
            <h3>Careers</h3>
            <p>셰프 경력 소개</p>
          </div>
          <div id='chefsMindset'>
            <h3>chefsMindset</h3>
            <p>셰프의 가치관</p>
          </div>
        </ChefTextWrap>
      </div>
    </ChefAllInformation>
  );
}

export default ChefInfoDesc;