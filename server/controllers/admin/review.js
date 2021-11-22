const { review, chef, user } = require('../../models');

module.exports = {
  get: async (req, res) => {
    const reqCuisine = req.params.cuisine;
    const findAllReview = await review.findAll();
    const sendReviewsData = [];

    for (let i = 0; i < findAllReview.length; i++) {
      // 리뷰쓴 사람들 이름과 cuisine 종류 찾아서 붙이기
      const userId = findAllReview[i].dataValues.rvUserId;
      const findUser = await user.findOne({ where: { id: userId } });
      const findUserName = findUser.dataValues.nickname;

      const chefId = findAllReview[i].dataValues.rvChefId;
      const findChefInfo = await chef.findOne({ where: chefId });
      const findChefCuisine = findChefInfo.dataValues.cuisine;

      findAllReview[i].dataValues.nickname = findUserName;
      findAllReview[i].dataValues.cuisine = findChefCuisine;
      delete findAllReview[i].dataValues.rvUserId;
      delete findAllReview[i].dataValues.rvImg;
      delete findAllReview[i].dataValues.rvChefId;
      delete findAllReview[i].dataValues.updatedAt;

      sendReviewsData.push(findAllReview[i].dataValues);
    }

    const startSlice = Number(req.query.startNum);
    const endSlice = Number(req.query.endNum);

    if (req.query.startNum && req.query.endNum) {
      res.status(200).json({
        message: 'ok',
        length: sendReviewsData.length,
        data: sendReviewsData.slice(startSlice, endSlice + 1),
      });
    } else if (!req.query.startNum || !req.query.endNum) {
      res.status(400).json({ message: 'undefined review' });
    }
  },
};
