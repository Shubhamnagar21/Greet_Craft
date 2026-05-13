const User = require('../models/User');
const Subscription = require('../models/Subscription');

const upgradeSubscription = async (req, res, next) => {
  try {
    const { plan } = req.body;
    if (!['monthly', 'yearly', 'lifetime'].includes(plan)) { res.status(400); throw new Error('Invalid plan. Choose monthly, yearly, or lifetime'); }

    const endDateMap = {
      monthly: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      yearly: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      lifetime: new Date('2099-12-31'),
    };

    let subscription = await Subscription.findOne({ userId: req.user._id });
    if (subscription) {
      subscription.plan = plan; subscription.status = 'active'; subscription.startDate = new Date();
      subscription.endDate = endDateMap[plan]; subscription.paymentId = `mock_${Date.now()}`;
      await subscription.save();
    } else {
      subscription = await Subscription.create({ userId: req.user._id, plan, status: 'active', startDate: new Date(), endDate: endDateMap[plan], paymentId: `mock_${Date.now()}` });
    }

    await User.findByIdAndUpdate(req.user._id, { subscriptionStatus: 'premium' });
    res.json({ message: 'Subscription upgraded successfully', subscription });
  } catch (error) { next(error); }
};

module.exports = { upgradeSubscription };
