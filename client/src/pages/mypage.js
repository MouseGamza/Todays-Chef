import MypageReservation from '../component/mypageReservation';
import MypageChefEdit from '../component/mypageChefEdit';
import MypageEdit from '../component/mypageEdit';
import MypageReview from '../component/mypageReview';
import { useState } from 'react';
import { MypageGrid, MyPageContent } from '../styled/styleMypage';
import { useSelector } from 'react-redux';
import { userStatus } from '../features/user/user';

function Mypage() {
  const menuList = {
    0: <MypageReservation />,
    1: <MypageReview />,
    2: <MypageEdit />,
    3: <MypageChefEdit />,
  }; // mypage component 리스트
  const userState = useSelector(userStatus);
  const [mypageMenu, setMypageMenu] = useState(0);
  const changeMenu = (index) => {
    setMypageMenu(index);
  }; // menuList에서 몇번째 내용이 보여져야 할지 지정해주는 함수

  return (
    <MypageGrid>
      <div id='mypageGridWrap'>
        <ul>
          <li
            className={mypageMenu === 0 ? 'mypageSelected' : null}
            onClick={() => changeMenu(0)}
          >
            예약 확인
          </li>
          {userState.isChef ? (
            <>
              <li
                className={mypageMenu === 3 ? 'mypageSelected' : null}
                onClick={() => changeMenu(3)}
              >
                자기 소개 수정
              </li>
              <li
                className={mypageMenu === 2 ? 'mypageSelected' : null}
                onClick={() => changeMenu(2)}
              >
                개인 정보 수정
              </li>
            </>
          ) : (
            <>
              <li
                className={mypageMenu === 1 ? 'mypageSelected' : null}
                onClick={() => changeMenu(1)}
              >
                리뷰 쓰기
              </li>
              <li
                className={mypageMenu === 2 ? 'mypageSelected' : null}
                onClick={() => changeMenu(2)}
              >
                개인 정보 수정
              </li>
            </>
          )}
        </ul>
        <MyPageContent>{menuList[mypageMenu]}</MyPageContent>
      </div>
    </MypageGrid>
  );
}

export default Mypage;
