import { Client } from "pg";

export default async function GeolocationCoordinates(req, res) {
    const {credentials} = req.body
    const client = new Client(process.env.NEXT_PUBLIC_COCKROACH_URL)
    await client.connect()
    try {
        let response = await client.query("SELECT login, password FROM admin")
        response = response.rows
        if (response[0].login == credentials.login && response[0].password == credentials.password){
            res.json({login: true, err: ''})
        } else if (!credentials.login || !credentials.password) {
            res.json({login: false, err: 'Enter correct login and password'})
        } else {
            res.json({login: false, err: 'Incorrect login or password'})
        }
    } catch (error) {
        return res.json({message: error.message})
    } finally {
        client.end()
    }
}