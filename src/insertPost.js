const mysql = require('mysql')
const util = require('util')

async function insertPost(ctx) {
  ctx.set('Content-Type', 'application/json')

  const body = ctx.request.body
  const id = body.id
  const title = body.title
  const text = body.text
  const dateCreated = body.dateCreated
  const dateStart = body.dateStart

  const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'auronews'
  });

  conn.query = util.promisify(conn.query)

  try {

    await conn.query(`
      INSERT INTO Posts 
        (id, title, text, dateCreated, dateStart)
      VALUES
        (?, ?, ?, ?, ?)
    `, [
      id,
      title,
      text,
      dateCreated,
      dateStart
    ])

    ctx.body = { message: 'success' }
    ctx.status = 200

  } catch (err) {
    ctx.body = { error: err.message }
    ctx.status = 400
    console.log('error', err)
  }
}

module.exports = insertPost