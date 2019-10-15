const mysql = require('mysql')
const util = require('util')

async function updatePost(ctx) {
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

    if (!id) {
      throw { status: 400 }
    }
    const params = []
    let sql = 'UPDATE Posts SET\n'
    let isFirstFilled = false
    if (title) {
      sql += 'title = ?'
      params.push(title)
      isFirstFilled = true
    }
    if (text) {
      if (isFirstFilled) {
        sql += ',\n'
      }
      sql += 'text = ?'
      params.push(text)
      isFirstFilled = true
    }
    if (dateCreated) {
      if (isFirstFilled) {
        sql += ',\n'
      }
      sql += 'dateCreated = ?'
      params.push(dateCreated)
      isFirstFilled = true
    }
    if (dateStart) {
      if (isFirstFilled) {
        sql += ',\n'
      }
      sql += 'dateStart = ?'
      params.push(dateStart)
      isFirstFilled = true
    }
    // ... 
    sql += '\nWHERE id = ?'
    params.push(id)

    await conn.query(sql, params)

    ctx.body = { message: 'success' }
    ctx.status = 200

  } catch (err) {
    console.log('err', err)
    ctx.body = { error: err.message }
    ctx.status = 400
    console.log('error', err)
  }
}

module.exports = updatePost