import sql_query from '../../lib/db'

export async function getAllFoodItems(req, res) {
    try {
        let response = await sql_query('SELECT * FROM FullMenu')
        res.json(response)
    } catch (error) {
        return res.json({message: error.message})
    }
}