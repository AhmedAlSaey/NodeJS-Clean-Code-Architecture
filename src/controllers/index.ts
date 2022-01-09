import { makeGetVehicleIdFromSlugController } from "./get-vehicle-id-from-slug"
import { getVehicleIDFromSlugService } from "../services/index"

let getVehicleIDFromSlugController = makeGetVehicleIdFromSlugController(getVehicleIDFromSlugService)

export {
    getVehicleIDFromSlugController
}