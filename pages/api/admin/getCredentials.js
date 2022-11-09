import {sql_query} from '../../../lib/db'

export default async function getCreds(req, res){
    const {credentials} = req.body
    
    try {
        let response = await sql_query('SELECT login, password FROM admin')
        if (response[0].login == credentials.login && response[0].password == credentials.password){
            res.json({login: true, err: ''})
        } else {
            res.json({login: false, err: 'Incorrect login or password'})
        }
    } catch (error) {
        return res.json({message: error.message})
    }
}