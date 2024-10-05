const WagerType = require('../models/WagerType');
const Deposit = require('../models/Deposit');
const Wager = require('../models/Wager');
const { generateRandomNumber } = require('./randomnessService');

async function placeWager(userId, betId, wagerAmount) {
  // Retrieve wager type
  const wagerType = await WagerType.findOne({ betId });
  if (!wagerType) {
    throw new Error('Invalid betId.');
  }

  // Calculate potential payout
  const potentialPayout = wagerAmount * wagerType.payoutMultiple;

  // Filter matching deposits
  const matchingDeposits = await Deposit.find({
    minHouseEdge: { $lte: wagerType.houseEdge },
    maxPayoutMultiple: { $gte: wagerType.payoutMultiple },
  });

  if (matchingDeposits.length === 0) {
    throw new Error('No house funds available for this wager.');
  }

  // Sum available funds
  const totalAvailableFunds = matchingDeposits.reduce((sum, deposit) => sum + deposit.amount, 0);

  if (totalAvailableFunds < potentialPayout) {
    const maxWagerAmount = Math.floor(totalAvailableFunds / wagerType.payoutMultiple);
    throw new Error(`Insufficient house funds. Maximum wager amount is ${maxWagerAmount}.`);
  }

  // Generate game outcome
  const result = generateRandomNumber(wagerType.numPossibleOutcomes);

  const isWin = wagerType.winningOutcomes.includes(result);
  const payout = isWin ? potentialPayout : 0;

  // Update deposits proportionally
  const profitOrLoss = isWin ? -payout : wagerAmount;
  const totalDepositedAmount = matchingDeposits.reduce((sum, deposit) => sum + deposit.amount, 0);

  for (const deposit of matchingDeposits) {
    const proportion = deposit.amount / totalDepositedAmount;
    const share = profitOrLoss * proportion;
    deposit.amount += share;
    await deposit.save();
  }

  // Create wager record
  const wager = new Wager({
    userId,
    betId,
    wagerAmount,
    outcome: {
      result,
      isWin,
      payout,
    },
  });

  await wager.save();

  return wager;
}

module.exports = { placeWager };