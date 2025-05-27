import { connectToDB } from '../../lib/mongodb';
import Donation from '../../models/Donation';

export default async function handler(req, res) {
  try {
    await connectToDB();

    const summary = await Donation.aggregate([
      {
        $addFields: {
          mealSizeNumber: {
            $switch: {
              branches: [
                { case: { $eq: ["$mealSize", "1-2"] }, then: 1.5 },
                { case: { $eq: ["$mealSize", "3-5"] }, then: 4 },
                { case: { $eq: ["$mealSize", "6+"] }, then: 6 }
              ],
              default: 0
            }
          }
        }
      },
      {
        $group: {
          _id: null,
          totalDonations: { $sum: 1 },
          totalMealsFed: { $sum: "$mealSizeNumber" }
        }
      }
    ]);

    const result = summary[0] || { totalDonations: 0, totalMealsFed: 0 };

    res.status(200).json({
      totalDonations: result.totalDonations,
      totalMealsFed: result.totalMealsFed,
    });
  } catch (error) {
    console.error('API /api/summary error:', error);
    res.status(500).json({ error: 'Failed to fetch donation summary' });
  }
}
