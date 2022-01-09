import { Controller, HTTPRequest } from "../models"
import { VehicleIdFromSlugService } from "../models/service-models/vehicle-id-from-slug-service"

let makeGetVehicleIdFromSlugController = (getVehicleIDFromSlugService: VehicleIdFromSlugService) => {
    let getVehicleIDFromSlugController: Controller = async (httpRequest: HTTPRequest) => {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            if (!httpRequest.query?.slug) throw new Error('Please insert a slug')
            let vehicleID = await getVehicleIDFromSlugService(httpRequest.query.slug)
            return {
                headers,
                statusCode: 200,
                body: vehicleID
            }
        } catch (e) {
            let error = e as Error
            console.log(error)
            return {
                headers,
                statusCode: 400,
                body: {
                    error: error.message
                }
            }
        }
    }
    return getVehicleIDFromSlugController
}

export {
    makeGetVehicleIdFromSlugController
}