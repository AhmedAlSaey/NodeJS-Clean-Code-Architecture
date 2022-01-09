import express from 'express'
import { Request, Response } from 'express'
import { getVehicleIDFromSlugController } from './controllers'
import { Controller, HTTPRequest } from './models'

let makeExpressCallback = (controller: Controller) => {
    return (req: Request, res: Response) => {
        const httpRequest: HTTPRequest = {
            body: req.body,
            query: req.query,
            params: req.params,
            ip: req.ip,
            method: req.method,
            path: req.path,
            headers: {
                'Content-Type': req.get('Content-Type'),
                Referer: req.get('referer'),
                'User-Agent': req.get('User-Agent')
            }
        }
        controller(httpRequest)
            .then(httpResponse => {
                if (httpResponse.headers) {
                    res.set(httpResponse.headers)
                }
                res.type('json')
                if (httpResponse.statusCode) {
                    res.status(httpResponse.statusCode).send(httpResponse.body)
                }
            })
            .catch(e => res.status(500).send({ error: 'An unkown error occurred.' }))
    }
}

const app = express()
app.get('/vehicle-id-from-slug', makeExpressCallback(getVehicleIDFromSlugController))

app.listen(3000, () => {
    console.log('Server is listening on port 3000')
})

export default app  
