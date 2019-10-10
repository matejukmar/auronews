const mysql = require('mysql')
const util = require('util')

async function getPosts(ctx) {
  ctx.set('Content-Type', 'application/json')

  const section = ctx.query.section

  const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'auronews'
  });

  conn.query = util.promisify(conn.query)

  try {
    let results = [];

    if (section) {
      results = await conn.query(`
        SELECT id, title, text, dateStart, location 
        FROM Posts 
        INNER JOIN Section_Post 
        ON Posts.id = Section_Post.postId 
        WHERE Section_Post.sectionId = ?     
      `, [section]
      )
    } else {
      results = await conn.query('SELECT id, title, text, dateStart, location FROM Posts')
    }

    const jsonResult = results.map((row) => {
      return {
        id: row.id,
        title: row.title,
        text: row.text,
        dateStart: row.dateStart,
        location: row.location
      }
    })

    ctx.body = jsonResult
    ctx.status = 200
  } catch (err) {
    ctx.body = []
    ctx.status = 400
    console.log('error', err)
  }
}

module.exports = getPosts