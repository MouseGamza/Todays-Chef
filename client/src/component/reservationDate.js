import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styled/customCalander.css';
import { ReservationWrap, ReservDateAndInfo } from '../styled/styleReservation';
import { ko } from 'date-fns/esm/locale';
import { getYear, getMonth, setHours, setMinutes, addDays } from 'date-fns';
import { Controller } from 'react-hook-form';
import { reservationStatus } from '../features/reservation/reservation';
import { useSelector } from 'react-redux';

function ReservationDate({
  makeReservation,
  setMakeReservation,
  register,
  control,
  errors,
  setSearchAddress,
  address,
  addressErr,
  titleInfo,
  reservation,
}) {
  const months = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];
  let pplSelect = [];
  for (
    let i = titleInfo.course.peopleMin;
    i <= titleInfo.course.peopleMax;
    i++
  ) {
    pplSelect.push(i);
  }
  const handleTouchStart = (e) => e.stopPropagation();
  const handleCalendarOpen = () => {
    document.addEventListener('touchstart', handleTouchStart, true);
    const [element] =
      document.getElementsByClassName('react-datepicker__day') || [];
    if (element) element.focus();
  };
  const reservationState = useSelector(reservationStatus);
  let dateFormat = 'yyyy년 MMMM dd일, aa h:mm';
  return (
    <>
      <ReservationWrap className={makeReservation === 1 ? null : 'none'}>
        <div
          className={
            makeReservation === 1
              ? 'reservationWrapper'
              : 'reservationWrapper none'
          }
        >
          <div className='arrow' onClick={() => setMakeReservation(0)}>
            &lt;
          </div>
          <div className='reservScheduleAndInfo'>
            <ReservDateAndInfo>
              <h2>1. 일정 및 개인정보 작성</h2>
              <div className='reservInputWrap'>
                <div className='reservInput'>
                  <label htmlFor='reservDateAndTime'>예약 날짜와 시간</label>
                  <Controller
                    control={control}
                    name='reservDateAndTime'
                    format={dateFormat}
                    defaultValue={null}
                    rules={{ required: '날짜를 선택해 주세요.' }}
                    render={({ field }) => (
                      <DatePicker
                        withPortal
                        placeholderText='날짜를 선택해주세요.'
                        locale={ko}
                        timeIntervals={60}
                        selected={field.value}
                        onChange={(e) => field.onChange(e)}
                        minDate={new Date()}
                        onCalendarOpen={handleCalendarOpen}
                        includeTimes={[
                          setHours(setMinutes(new Date(), 0), 12),
                          setHours(setMinutes(new Date(), 0), 13),
                          setHours(setMinutes(new Date(), 0), 14),
                          setHours(setMinutes(new Date(), 0), 15),
                          setHours(setMinutes(new Date(), 0), 16),
                          setHours(setMinutes(new Date(), 0), 17),
                          setHours(setMinutes(new Date(), 0), 18),
                          setHours(setMinutes(new Date(), 0), 19),
                        ]}
                        excludeDates={[
                          new Date(),
                          addDays(new Date(), 1),
                          ...titleInfo.reservation.map((el) => new Date(el)),
                          ...reservationState.data.map(
                            (el) => new Date(el.rsDate)
                          ),
                        ]}
                        dateFormat={dateFormat}
                        showTimeSelect
                        renderCustomHeader={({
                          date,
                          prevMonthButtonDisabled,
                          nextMonthButtonDisabled,
                          decreaseMonth,
                          increaseMonth,
                        }) => (
                          <div
                            style={{
                              margin: 10,
                              display: 'flex',
                              justifyContent: 'space-between',
                              fontSize: 20,
                            }}
                          >
                            <div
                              className='btn_month btn_month-prev'
                              onClick={decreaseMonth}
                              disabled={prevMonthButtonDisabled}
                              style={{
                                cursor: 'pointer',
                              }}
                            >
                              &lt;
                            </div>
                            <div className='month-day'>
                              {getYear(date)}.{months[getMonth(date)]}
                            </div>
                            <div
                              className='btn_month btn_month-next'
                              onClick={increaseMonth}
                              disabled={nextMonthButtonDisabled}
                              style={{
                                cursor: 'pointer',
                              }}
                            >
                              &gt;
                            </div>
                          </div>
                        )}
                      />
                    )}
                  ></Controller>
                </div>
                {errors.reservDateAndTime && (
                  <span className='reservAlert'>
                    {errors.reservDateAndTime.message}
                  </span>
                )}
              </div>

              <div className='reservInputWrap'>
                <div className='reservInput findAddress'>
                  <label htmlFor='reservMainAddress'>주소</label>
                  <input
                    type='text'
                    name='reservMainAddress'
                    placeholder='주소를 입력해주세요.'
                    defaultValue={address}
                    onClick={() => setSearchAddress(true)}
                    id='reservMainAddress'
                  />
                </div>
                {!addressErr ? (
                  <span className='reservAlert'>주소 입력이 필요합니다.</span>
                ) : null}
              </div>

              <div className='reservInputWrap'>
                <div className='reservInput'>
                  <label htmlFor='reservSubAddress'>세부 주소</label>
                  <input
                    type='text'
                    name='reservSubAddress'
                    placeholder='세부 주소'
                    {...register('reservSubAddress', {
                      required: '세부 주소 입력이 필요합니다.',
                    })}
                  />
                </div>
                {errors.reservSubAddress && (
                  <span className='reservAlert'>
                    {errors.reservSubAddress.message}
                  </span>
                )}
              </div>

              <div className='reservInputWrap'>
                <div className='reservInput'>
                  <label htmlFor='reservPeople'>인원</label>
                  <Controller
                    control={control}
                    name='reservPeople'
                    rules={{ required: '인원을 선택해 주세요.' }}
                    render={({ field }) => (
                      <select onChange={(e) => field.onChange(e)}>
                        <option>인원을 선택해주세요.</option>
                        {pplSelect.map((el, idx) => {
                          return (
                            <option value={el} key={idx}>
                              {el}명
                            </option>
                          );
                        })}
                      </select>
                    )}
                  />
                </div>
                {errors.reservPeople && (
                  <span className='reservAlert'>
                    {errors.reservPeople.message}
                  </span>
                )}
              </div>

              <div className='reservInputWrap'>
                <div className='reservInput'>
                  <label htmlFor='reservMobile'>핸드폰 번호</label>
                  <input
                    type='text'
                    name='reservMobile'
                    placeholder='핸드폰 번호 (ex. 010-1234-5678)'
                    {...register('reservMobile', {
                      required: '핸드폰 번호 입력이 필요합니다.',
                      pattern: {
                        value: /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/,
                        message: '양식에 맞지 않는 전화번호 입니다.',
                      },
                    })}
                  />
                </div>
                {errors.reservMobile && (
                  <span className='reservAlert'>
                    {errors.reservMobile.message}
                  </span>
                )}
              </div>
            </ReservDateAndInfo>
          </div>
          <div className='arrow' onClick={() => setMakeReservation(2)}>
            &gt;
          </div>
        </div>
      </ReservationWrap>
    </>
  );
}

export default ReservationDate;
