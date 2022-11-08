import {sql_query} from '../../lib/db'

export default async function getAllFoodItems(req, res) {
    try {
        let response = await sql_query('SELECT * FROM fullmenu',[])
        res.json(response)
    } catch (error) {
        return res.json({message: error.message})
    }
}