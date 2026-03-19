const client = require("../../config/dbase");
const { getCache, setCache } = require("../../utils/cache");

exports.getCashflow = async (userId) => {
  const result = await client.query(
    `
        SELECT
            SUM(CASE WHEN type='revenue' THEN amount ELSE 0 END) AS revenue,
            SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS expense
        FROM transactions
        WHERE user_id = $1
        `,
    [userId],
  );

  const revenue = Number(result.rows[0].revenue) || 0;
  const expense = Number(result.rows[0].expense) || 0;

  return {
    revenue,
    expense,
    balance: revenue - expense,
  };
};

exports.getMonthExpenses = async (userId) => {
  const cacheKey = `monthly-expense: ${userId}`;
  const cached = await getCache(cacheKey);

  if (cached) {
    return cached;
  }

  const result = await client.query(
    `
        SELECT
            DATE_TRUNC('month', date) AS month,
            SUM(amount)::INTEGER AS total
        FROM transactions
        WHERE user_id = $1
            AND type = 'expense'
        GROUP BY month
        ORDER BY month
        `,
    [userId],
  );

  const data = result.rows;
  await setCache(cacheKey, data, 120);

  return data;
};

exports.getCatBreakdown = async (userId) => {
  const cacheKey = `category-breakdown: ${userId}`;
  const cached = await getCache(cacheKey);

  if (cached) {
    return cached;
  }

  const result = await client.query(
    `
        SELECT
            c.name AS category,
            SUM(t.amount)::INTEGER AS total
        FROM transactions t
        JOIN categories c ON c.id = t.category_id
        WHERE t.user_id = $1
            AND t.type = 'expense'
        GROUP BY c.name
        ORDER BY total DESC
        `,
    [userId],
  );
  const data = result.rows;
  await setCache(cacheKey, data, 120);
  return data;
};

exports.getInsights = async (userId) => {
  const cacheKey = `insight: ${userId}`
  const cached = await getCache(cacheKey)

  if (cached) {
    return cached
  }

  const summarQuery = `
    SELECT
      SUM(CASE WHEN type = 'revenue' THEN amount ELSE 0 END) AS revenue,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS expense
    FROM transactions
    WHERE user_id = $1
  `;

  const avgExpenseQuery = `
    SELECT AVG(amount) AS avg_expense
    FROM transactions
    WHERE user_id = $1 AND type = 'expense'
  `;

  const largestExpenseQuery = `
    SELECT title, amount
    FROM transactions
    WHERE user_id = $1 AND type = 'expense'
    ORDER BY amount DESC
    LIMIT 1
  `;

  const topCategoryQuery = `
    SELECT c.name, SUM(t.amount) AS total
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = $1 AND t.type = 'expense'
    GROUP BY c.name
    ORDER BY total DESC
    LIMIT 1
  `;

  const [summary, avgExpense, largestExpense, topCategory] = await Promise.all([
    client.query(summarQuery, [userId]),
    client.query(avgExpenseQuery, [userId]),
    client.query(largestExpenseQuery, [userId]),
    client.query(topCategoryQuery, [userId]),
  ]);

  const revenue = Math.round(summary.rows[0].revenue) || 0;
  const expense = Math.round(summary.rows[0].expense) || 0;

  const data = {
    totalRevenue: revenue,
    totalExpense: expense,
    balance: revenue - expense,
    avgExpense: Math.round(avgExpense.rows[0].avg_expense || 0),
    largestExpense: largestExpense.rows[0] || null,
    topCategory: topCategory.rows[0]
      ? {
          name: topCategory.rows[0].name,
          total: Number(topCategory.rows[0].total),
        }
      : null,
  };

  await setCache(cacheKey, data, 120)

  return data
};
