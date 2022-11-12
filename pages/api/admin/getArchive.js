import { sql_query } from "../../../lib/db";

export default async function getArchives(req, res) {
    try {
        let resp = await sql_query('SELECT * FROM orders')
        res.json(resp)
    } catch (error) {
        return res.json({message: error.message})
    }
}