// import {sql_query} from '../../lib/db'

// export default async function getAllFoodItems(req, res) {
//     try {
//         let response = await sql_query('SELECT * FROM fullmenu',[])
//         res.json(response)
//     } catch (error) {
//         return res.json({message: error.message})
//     }
// }

import {Client} from 'pg'

export default async function getAllFoodItems(req, res) {
    const client = new Client(process.env.NEXT_PUBLIC_COCKROACH_URL)
    await client.connect()
    try {
        const response = await client.query("SELECT * FROM fullmenu")
        console.log(response.rows, 'rows')
        res.json(response)
    } catch (error) {
        return res.json({message: error.message})
    } finally {
        client.end()
    }
}