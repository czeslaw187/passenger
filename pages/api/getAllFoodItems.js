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