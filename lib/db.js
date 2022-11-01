import mysql from 'serverless-mysql'

export const db = mysql({
    config: {
        host: process.env.NEXT_PUBLIC_DATABASE_HOST,
        database: process.env.NEXT_PUBLIC_DATABASE,
        user: process.env.NEXT_PUBLIC_DATABASE_USER,
        password: process.env.NEXT_PUBLIC_PWD,
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