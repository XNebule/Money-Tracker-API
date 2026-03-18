const client = require('../../config/dbase')
const aS = require('../analytic/services')

exports.getDashboardSummary = async (userId) => {
  const result = await client.query(
    `
    SELECT type, SUM(amount) AS total
    FROM transactions
    WHERE user_id = $1
    GROUP BY type
    `,
    [userId],
  );

  let revenue = 0;
  let expense = 0;

  result.rows.forEach((row) => {
    if (row.type === "revenue") revenue = Number(row.total);
    if (row.type === "expense") expense = Number(row.total);
  });

  return {
    revenue,
    expense,
    balance: revenue - expense,
  };
};

exports.getDashboard = async (userId) => {
  const [summary, monthly, categories] = await Promise.all([
    exports.getDashboardSummary(userId),
    aS.getMonthlyExpenses(userId),
    aS.getCatBreakdown(userId),
  ]);

  return {
    summary,
    monthly,
    categories,
  };
};
