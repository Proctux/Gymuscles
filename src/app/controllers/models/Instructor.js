const { date, age } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    create(data, callback) {
        
        const query = `
            INSERT INTO instructors (
                name,
                avatar_url,
                gender,
                services,
                birth,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            data.gender,
            data.services,
            date(data.birth).iso,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results) {
            if(err) throw "Database error!"

            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`SELECT * FROM instructors WHERE id = $1`, [id], function(err, results) {
            if(err) throw "Database error!"
            callback(results.rows[0])
        })
    }
}