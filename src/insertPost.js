const mysql = require('mysql')
const util = require('util')

async function insertPost(ctx) {
  ctx.set('Content-Type', 'application/json')

  const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'auronews'
  });

  conn.query = util.promisify(conn.query)

  try {
    // const results = await conn.query('SELECT id, title, text, dateStart, location FROM Posts')
    // const jsonResult = results.map((row) => {
    //   return {
    //     id: row.id,
    //     title: row.title,
    //     text: row.text,
    //     dateStart: row.dateStart,
    //     location: row.location
    //   }
    // })
    // ctx.body = jsonResult
    // ctx.status = 200
    ctx.body = { message: "I am happy" }
  } catch (err) {
    ctx.body = []
    ctx.status = 400
    console.log('error', err)
  }
}

module.exports = insertPost