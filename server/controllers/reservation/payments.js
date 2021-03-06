const { isAuthorized, basicAccessToken } = require('../token/accessToken');
const {
  sendRefreshToken,
  refreshAuthorized,
} = require('../token/refreshToken');

const { reservation, review } = require('../../models');

const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  post: async (req, res) => {
    try {
      const { imp_uid, merchant_uid } = req.body.data;
      const {
        people,
        allergy,
        location,
        mobile,
        rsDate,
        rsTime,
        isOven,
        burner,
        messageToChef,
        rsUserId,
        rsChefId,
        rsCourseId,
        merchent_uid,
      } = req.body.data.reservationData;
      const accessVerify = isAuthorized(req);

      if (!accessVerify) {
        const refreshVerify = refreshAuthorized(req);
        if (!refreshVerify) {
          res.status(401).json({ message: 'Send new Login Request' });
        } else {
          delete refreshVerify.exp;
          const accessToken = basicAccessToken(refreshVerify);

          const makeReservation = await reservation.create({
            people: people,
            allergy: allergy,
            location: location,
            mobile: mobile,
            rsDate: rsDate,
            rsTime: rsTime,
            isOven: isOven,
            burner: burner,
            messageToChef: messageToChef,
            rsUserId: rsUserId,
            rsChefId: rsChefId,
            rsCourseId: rsCourseId,
            merchantUid: merchant_uid,
          });

          await review.create({
            rating: '',
            eval: '',
            rvImg: '',
            rvUserId: rsUserId,
            rvChefId: rsChefId,
            rvReservationId: makeReservation.dataValues.id,
          });

          const getToken = await axios({
            url: 'https://api.iamport.kr/users/getToken',
            method: 'post', // POST method
            headers: { 'Content-Type': 'application/json' }, // "Content-Type": "application/json"
            data: {
              imp_key: process.env.IAMPORT_RESTAPI_KEY, // REST API ???
              imp_secret: process.env.IAMPORT_RESTAPI_SECRET, // REST API Secret
            },
          });
          const { access_token } = getToken.data.response; // ?????? ??????

          const getPaymentData = await axios({
            url: `https://api.iamport.kr/payments/${imp_uid}`, // imp_uid ??????
            method: 'get', // GET method
            headers: { Authorization: access_token }, // ?????? ?????? Authorization header??? ??????
          });
          const paymentData = getPaymentData.data.response; // ????????? ?????? ??????

          await reservation.update(
            {
              impUid: getPaymentData.data.response.imp_uid,
              receiptUrl: getPaymentData.data.response.receipt_url,
              amount: getPaymentData.data.response.amount,
            },
            { where: { id: makeReservation.dataValues.id } }
          );

          const { amount, status } = paymentData;

          if (amount === 10) {
            switch (status) {
              case 'paid': // ?????? ??????
                res.status(201).json({
                  status: 'success',
                  message: '?????? ?????? ??????',
                  accessToken: accessToken,
                });
                break;
            }
          } else {
            throw { status: 'forgery', message: '????????? ????????????' };
          }
        }
      } else {
        const makeReservation = await reservation.create({
          people: people,
          allergy: allergy,
          location: location,
          mobile: mobile,
          rsDate: rsDate,
          rsTime: rsTime,
          isOven: isOven,
          burner: burner,
          messageToChef: messageToChef,
          rsUserId: rsUserId,
          rsChefId: rsChefId,
          rsCourseId: rsCourseId,
          merchantUid: merchant_uid,
        });

        await review.create({
          rating: '',
          eval: '',
          rvImg: '',
          rvUserId: rsUserId,
          rvChefId: rsChefId,
          rvReservationId: makeReservation.dataValues.id,
        });

        const getToken = await axios({
          url: 'https://api.iamport.kr/users/getToken',
          method: 'post', // POST method
          headers: { 'Content-Type': 'application/json' }, // "Content-Type": "application/json"
          data: {
            imp_key: process.env.IAMPORT_RESTAPI_KEY, // REST API ???
            imp_secret: process.env.IAMPORT_RESTAPI_SECRET, // REST API Secret
          },
        });
        const { access_token } = getToken.data.response; // ?????? ??????

        const getPaymentData = await axios({
          url: `https://api.iamport.kr/payments/${imp_uid}`, // imp_uid ??????
          method: 'get', // GET method
          headers: { Authorization: access_token }, // ?????? ?????? Authorization header??? ??????
        });
        const paymentData = getPaymentData.data.response; // ????????? ?????? ??????

        await reservation.update(
          {
            impUid: getPaymentData.data.response.imp_uid,
            receiptUrl: getPaymentData.data.response.receipt_url,
            amount: getPaymentData.data.response.amount,
          },
          { where: { id: makeReservation.dataValues.id } }
        );

        const { amount, status } = paymentData;

        if (amount === 10) {
          switch (status) {
            case 'paid': // ?????? ??????
              res.status(200).json({
                status: 'success',
                message: '?????? ?????? ??????',
              });
              break;
          }
        } else {
          throw { status: 'forgery', message: '????????? ????????????' };
        }
      }
      // !!!!!!!!!!!!!reservation ???????????????!!!!!!!!!!!!!!!!!!!
    } catch (err) {
      console.log(err);
      await reservation.destroy({
        where: { merchantUid: req.body.data.merchant_uid },
        force: true,
      });
      res.status(400).json({ message: err });
    }
  },
};
