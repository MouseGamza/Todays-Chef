const { user, chef, reservation } = require('../../models');
const { basicAccessToken } = require('../token/accessToken');
const {
  basicRefreshToken,
  sendRefreshToken,
} = require('../token/refreshToken');
const { comparePwd } = require('../hashing/hashingPwd');

module.exports = {
  post: async (req, res) => {
    const { email, password } = req.body;
    const userInfo = await user.findOne({ where: { email } });

    if (!userInfo) {
      res.status(400).json({ message: 'Invalid User' });
    } else {
      if (userInfo.dataValues.isOauth) {
        res.status(400).json({ message: 'You Already Signed up' });
      } else if (!comparePwd(password, userInfo.dataValues.password)) {
        res.status(400).json({ message: 'Invalid User' });
      } else {
        delete userInfo.dataValues.password;
        delete userInfo.dataValues.createdAt;
        delete userInfo.dataValues.updatedAt;
        const accessToken = basicAccessToken(userInfo.dataValues);
        const refreshToken = basicRefreshToken(userInfo.dataValues);
        const reservInfo = await reservation.findAll({
          where: { rsUserId: userInfo.dataValues.id },
        }); // 예약정보
        sendRefreshToken(res, refreshToken);

        if (!userInfo.dataValues.isChef) {
          res
            .status(200)
            .json({ accessToken, userInfo, reservInfo, message: 'ok' });
        } else {
          const findChef = await chef.findOne({
            where: { chUserId: userInfo.dataValues.id },
          });
          userInfo.dataValues.chefId = findChef.dataValues.id;
          res.status(200).json({ accessToken, userInfo, message: 'ok' });
        }
      }
    }
  },
};
