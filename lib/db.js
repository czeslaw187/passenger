import mysql from 'serverless-mysql'

export const db = mysql({
    config: {
        host: 'sql8.freesqldatabase.com',
        database: 'sql8553699',
        user: 'sql8553699',
        password: 'tflcEEzYNS',
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