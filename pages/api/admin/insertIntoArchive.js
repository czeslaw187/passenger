import {sql_query} from '../../../lib/db'

export default async function insertIntoArchive(req, res) {
    const {obj} = req.body
    const items = obj.orderArr.reduce((tot,sum)=>{return tot + sum.item + ', '},'')
    const date = obj.date.join('')
    try {
        let resp = await sql_query('INSERT INTO orders (id, date, items, total) VALUES (?,?,?,?)',[obj.orderId, date, items, obj.total])
        res.json(resp)
    } catch (error) {
        return res.json({message: error.message})
    }
}