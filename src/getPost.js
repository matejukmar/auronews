const mysql = require('mysql')
const util = require('util')

async function getPost(ctx) {
  ctx.set('Content-Type', 'application/json')

  const postId = ctx.params.id

  const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'auronews'
  });

  conn.query = util.promisify(conn.query)

  try {

    const results = await conn.query(`
      SELECT id, title, text, dateStart, location 
      FROM Posts
      WHERE id = ?
    `, [postId])

    let result = {}

    if (results.length > 0) {
      result = {
        id: results[0].id,
        title: results[0].title,
        text: results[0].text,
        dateStart: results[0].dateStart,
        location: results[0].location
      }
    }

    ctx.body = result
    ctx.status = 200
  } catch (err) {
    ctx.body = []
    ctx.status = 400
    console.log('error', err)
  }
}

module.exports = getPost