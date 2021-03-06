import { ModalBackground, ModalBox } from '../styled/styledModal';
import { useDispatch } from 'react-redux';
import { closeLoginErrorModal } from '../features/user/modal';

// function LoginErrorModal({ setIsLoginErrorModalOpen, isServerError }) {
function LoginErrorModal() {
  const dispatch = useDispatch();
  const clickOk = () => {
    dispatch(closeLoginErrorModal());
    window.location.replace('/loginOrSignup');
  };

  return (
    <>
      <ModalBackground>
        <ModalBox>
          <span>로그인 실패</span>
          <div id='loginDesc'>
            <p>
              이미 가입되어 있거나, <br />
              잘못된 정보입니다. <br />
              다시 시도해보세요.
            </p>
          </div>
          <div id='confirmBtn'>
            <button onClick={clickOk}>확인</button>
          </div>
        </ModalBox>
      </ModalBackground>
    </>
  );
}

export default LoginErrorModal;
