const pool = require("../../src/config/dbase");

class DbHelper {
  async cleanup(patterns = {}) {
    const { transactionTitles, categoryNames } = patterns;

    if (transactionTitles?.length) {
      await pool.query(`DELETE FROM transactions WHERE title = ANY($1)`, [
        transactionTitles,
      ]);
    }

    if (categoryNames?.length) {
      await pool.query(`DELETE FROM categories WHERE name = ANY($1)`, [
        categoryNames,
      ]);
    }
  }

  async close() {
    await pool.end();
  }
}

module.exports = new DbHelper();
