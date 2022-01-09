import {
    VehicleIdFromSlugRepository,
    VehicleIdFromSlugDTO,
    VehicleIdFromSlugService
} from "../models"

let makeGetVehicleIdFromSlugService = (vehicleIdFromSlugRepository: VehicleIdFromSlugRepository) => {
    let getVehicleIdFromSlugService: VehicleIdFromSlugService = async (slug: string) => {
        if (!slug.match(/^[a-z0-9-]+(_[a-z0-9-]+)?$/g)) {
            throw new Error('Invalid slug inserted')
        }
        let vehicleIDResponse = await vehicleIdFromSlugRepository.find({ slug: slug })
        if (vehicleIDResponse.length > 1) {
            throw new Error('More than one record found for this slug')
        }
        else if (vehicleIDResponse.length === 0) {
            throw new Error('No vehicle found for the given slug')
        }
        let vehicleIDDTO: VehicleIdFromSlugDTO = vehicleIDResponse[0]
        return vehicleIDDTO
    }
    return getVehicleIdFromSlugService
}

export {
    makeGetVehicleIdFromSlugService
}