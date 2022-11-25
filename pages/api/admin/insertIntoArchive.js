// import {sql_query} from '../../../lib/db'

// export default async function insertIntoArchive(req, res) {
//     const {obj} = req.body
//     const items = obj.orderArr.reduce((tot,sum)=>{return tot + sum.item + ', '},'')
//     const date = obj.date.join('')
//     try {
//         let resp = await sql_query('INSERT INTO orders (id, date, items, total) VALUES (?,?,?,?)',[obj.orderId, date, items, obj.total])
//         res.json(resp)
//     } catch (error) {
//         return res.json({message: error.message})
//     }
// }

import { Client } from "pg";

export default async function insertIntoArchive(req, res) {
    const client = new Client(process.env.NEXT_PUBLIC_COCKROACH_URL)
    const {obj} = req.body
    const items = obj.orderArr.reduce((tot,sum)=>{return tot + sum.item + ', '},'')
    const date = obj.date.join('')
    await client.connect()
    try {
        let response = await client.query(`INSERT INTO orders (id, date, items, total) VALUES ($1, $2, $3, $4)`,[obj.orderId, date, items, obj.total])
        console.log('success')
        res.json(response)
    } catch (error) {
        res.json({message: error.message})
    } finally {
        client.end()
    }
}