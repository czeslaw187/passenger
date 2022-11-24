// import { sql_query } from "../../../lib/db";

// export default async function getArchives(req, res) {
//     try {
//         let resp = await sql_query('SELECT * FROM orders')
//         res.json(resp)
//     } catch (error) {
//         return res.json({message: error.message})
//     }
// }

import { Client } from "pg";

export default async function getArchive(req, res) {
    const client = new Client(process.env.NEXT_PUBLIC_COCKROACH_URL)
    await client.connect()
    try {
        let response = await client.query("SELECT * FROM orders")
        console.log(response, 'archive api')
        res.json(response)
    } catch (error) {
        return res.json({message: error.message})
    } finally {
        client.end()
    }
}