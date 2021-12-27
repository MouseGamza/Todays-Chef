const { chef } = require('../../models');

module.exports = {
  get: async (req, res) => {
    const findHansik = await chef.findAll({ where: { cuisine: '한식' } });
    const findYangsik = await chef.findAll({ where: { cuisine: '양식' } });
    const findJungsik = await chef.findAll({ where: { cuisine: '중식' } });
    const findIlsik = await chef.findAll({ where: { cuisine: '일식' } });

    const sendDataArr = [];

    const ratingHansikArr = findHansik.map((el) =>
      Number(el.dataValues.rating)
    );
    const ratingYangsikArr = findYangsik.map((el) =>
      Number(el.dataValues.rating)
    );
    const ratingJungsikArr = findJungsik.map((el) =>
      Number(el.dataValues.rating)
    );
    const ratingIlikArr = findIlsik.map((el) => Number(el.dataValues.rating));
    // cuisine별 별점 찾기

    const findMaxRatingHansik = Math.max
      .apply(null, ratingHansikArr)
      .toFixed(1);
    const findMaxRatingYangsik = Math.max
      .apply(null, ratingYangsikArr)
      .toFixed(1);
    const findMaxRatingJungsik = Math.max
      .apply(null, ratingJungsikArr)
      .toFixed(1);
    const findMaxRatingIlsik = Math.max.apply(null, ratingIlikArr).toFixed(1);
    // cuisine별 최대 별점 찾기

    const findBestHansikChef = await chef.findOne({
      where: { cuisine: '한식', rating: String(findMaxRatingHansik) },
    });
    const findBestYangsikChef = await chef.findOne({
      where: { cuisine: '양식', rating: String(findMaxRatingYangsik) },
    });
    const findBestJungsikChef = await chef.findOne({
      where: { cuisine: '중식', rating: String(findMaxRatingJungsik) },
    });
    const findBestIlsikChef = await chef.findOne({
      where: { cuisine: '일식', rating: String(findMaxRatingIlsik) },
    });

    delete findBestHansikChef.dataValues.updatedAt;
    delete findBestHansikChef.dataValues.createdAt;
    delete findBestHansikChef.dataValues.greeting;
    delete findBestHansikChef.dataValues.career;
    delete findBestHansikChef.dataValues.values;

    delete findBestYangsikChef.dataValues.updatedAt;
    delete findBestYangsikChef.dataValues.createdAt;
    delete findBestYangsikChef.dataValues.greeting;
    delete findBestYangsikChef.dataValues.career;
    delete findBestYangsikChef.dataValues.values;

    delete findBestJungsikChef.dataValues.updatedAt;
    delete findBestJungsikChef.dataValues.createdAt;
    delete findBestJungsikChef.dataValues.greeting;
    delete findBestJungsikChef.dataValues.career;
    delete findBestJungsikChef.dataValues.values;

    delete findBestIlsikChef.dataValues.updatedAt;
    delete findBestIlsikChef.dataValues.createdAt;
    delete findBestIlsikChef.dataValues.greeting;
    delete findBestIlsikChef.dataValues.career;
    delete findBestIlsikChef.dataValues.values;

    sendDataArr.push(
      findBestHansikChef.dataValues,
      findBestYangsikChef.dataValues,
      findBestJungsikChef.dataValues,
      findBestIlsikChef.dataValues
    );

    res.json({ message: 'ok', data: sendDataArr });
  },
};
