import {
  MainSection3Wrap,
  BestOfChefsWrap,
  ChefStar,
} from '../styled/styleMain';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import basic_profile from '../todaysChefIMG/basic_profile.jpeg';
import axios from 'axios';

import fullStar from '../todaysChefIMG/ratingStar.svg';
import halfStar from '../todaysChefIMG/halfStar.svg';
import noneStar from '../todaysChefIMG/noneStar.svg';

function MainSection3() {
  const [chefData, setChefData] = useState([]);
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;

  const getBestChef = async () => {
    const chefInfo = await axios.get(`${url}/main`);
    setChefData(chefInfo.data.data);
  };

  useEffect(() => {
    getBestChef();
  }, []);

  const ratingStar = (el, idx) => {
    let arr = [];
    let NumRating = Number(el.rating);
    let parsed = parseInt(NumRating);
    let rest = NumRating - parsed;
    //* fullStar 처리 : 정수로 만들어 버려서 있으면 무조건 다 주기
    for (let i = 0; i < parsed; i++) {
      arr.push(fullStar);
    }
    // * halfStar 처리 : 0~1 사이에 rest가 있는지, 0~0.5면 none, 0.5이상이면 halfStar
    if (0 < rest && rest < 1) {
      if (0 < rest && rest < 0.5) {
        arr.push(noneStar);
      } else {
        arr.push(halfStar);
      }
    }
    // * 남은 부분에 noneStar 넣어주기
    for (let i = arr.length; i < 5; i++) {
      arr.push(noneStar);
    }
    return arr;
  };

  return (
    <>
      <MainSection3Wrap>
        <h3>각 요리별 최고의 셰프를 알아보고 경험해보세요.</h3>
        <BestOfChefsWrap>
          <ul>
            {chefData.map((el, idx) => {
              return (
                <li key={el.id} className='chef'>
                  <Link to={`/chef?chefId=${el.id}`}>
                    <div className='bestCuisine'>{el.cuisine}</div>
                    <div className='chefPic'>
                      {el.chefImg === '' ? (
                        <img src={basic_profile} alt='셰프 사진' />
                      ) : (
                        <img src={el.chefImg} alt='셰프 사진' />
                      )}
                    </div>
                    <h4>{el.chefName}</h4>
                    <ChefStar key={idx}>
                      <div>
                        {ratingStar(el, idx).map((ele, idx) => {
                          return <img src={ele} alt='' key={idx} />;
                        })}
                      </div>
                    </ChefStar>
                    <span>
                      {el.rating ? Number(el.rating).toFixed(1) : 0.0}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </BestOfChefsWrap>
      </MainSection3Wrap>
    </>
  );
}

export default MainSection3;
