import mysql from 'serverless-mysql'

export const db = mysql({
    config: {
        host: 'sql.freedb.tech',
        database: 'freedb_passenger',
        user: 'freedb_surveygreg88',
        password: 'AwnuBK79sF$yfaK',
        port: 3306
    }
})

export async function sql_query(query_string, values=[]) {
    try {
        const results = await db.query(query_string, values)
        await db.end()
        return results
    } catch(e) {
        throw Error(e.message)
    }
}