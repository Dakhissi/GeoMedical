const { Ref } = require("faunadb");
const faunadb = require("faunadb");
const secret = "fnAFC8qVePAAzZU9v98HoIsm1MeQVEsSI0txkvyY";

const q = faunadb.query;
const client = new faunadb.Client({ secret });

module.exports = async (req, res) => {
    const inputData = req.body.data;
    try {
      const dbs = await client.query(
        q.Create(q.Collection("Services"), {
          data: {
            task: inputData,
            done: false,
          },
        })
      );
      res.status(200).json(dbs.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };