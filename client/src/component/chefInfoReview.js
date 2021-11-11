import { ChefAllReviewInfo } from '../styled/styleChefInfo';
import basic_profile from '../todaysChefIMG/basic_profile.jpeg';
import axios from 'axios';

require('dotenv').config();
axios.defaults.withCredentials = true;

function ChefAllReview() {
  const url = process.env.REACT_APP_API_URL || `http://localhost:4000`;
  // axios로 셰프에 달린 리뷰 받아오기
  // 받아온 리뷰로 .userReview 렌더링하기

  return (
    <ChefAllReviewInfo>
      <div id='chefReviewWrap'>
        <ul id='reviewWrap'>
          <li className='userReview'>
            <div className='userProfile'>
              <img src={basic_profile} alt='유저 사진' />
              <h2 className='userNickname'>XXX님</h2>
              <span>4.9</span>
              <div>⭐⭐⭐⭐⭐</div>
            </div>
            <div className='reviewTextWrap'>
              <p className='reviewText'>
                가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나(120자)
              </p>
            </div>
            <div className='reviewPicture'>
              <img src={basic_profile} alt='코스 사진' />
              <img src={basic_profile} alt='코스 사진' />
            </div>
          </li>
          <li className='userReview'>
            <div className='userProfile'>
              <img src={basic_profile} alt='유저 사진' />
              <h2 className='userNickname'>XXX님</h2>
              <span>4.9</span>
              <div>⭐⭐⭐⭐⭐</div>
            </div>
            <div className='reviewTextWrap'>
              <p className='reviewText'>
                가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나(120자)
              </p>
            </div>
            <div className='reviewPicture'>
              <img src={basic_profile} alt='코스 사진' />
              <img src={basic_profile} alt='코스 사진' />
            </div>
          </li>
          <li className='userReview'>
            <div className='userProfile'>
              <img src={basic_profile} alt='유저 사진' />
              <h2 className='userNickname'>XXX님</h2>
              <span>4.9</span>
              <div>⭐⭐⭐⭐⭐</div>
            </div>
            <div className='reviewTextWrap'>
              <p className='reviewText'>
                가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나(120자)
              </p>
            </div>
            <div className='reviewPicture'>
              <img src={basic_profile} alt='코스 사진' />
              <img src={basic_profile} alt='코스 사진' />
            </div>
          </li>
          <li className='userReview'>
            <div src={basic_profile} className='userProfile'>
              <img src={basic_profile} alt='유저 사진' />
              <h2 className='userNickname'>XXX님</h2>
              <span>4.9</span>
              <div>⭐⭐⭐⭐⭐</div>
            </div>
            <div className='reviewTextWrap'>
              <p className='reviewText'>
                가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나다라마바사아가나(120자)
              </p>
            </div>
            <div className='reviewPicture'>
              <img src={basic_profile} alt='코스 사진' />
              <img src={basic_profile} alt='코스 사진' />
            </div>
          </li>
        </ul>

        <div className='reviewPagenation'>
          <ul>
            <li>&lt;&lt;</li>
            <li>&lt;</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>&gt;</li>
            <li>&gt;&gt;</li>
          </ul>
        </div>
      </div>
    </ChefAllReviewInfo>
  );
}

export default ChefAllReview;
