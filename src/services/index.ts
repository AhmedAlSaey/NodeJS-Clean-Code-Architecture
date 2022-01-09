import { makeGetVehicleIdFromSlugService } from "./get-vehicle-id-of-slug";
import { vehicleIdFromSlugRepository } from "../repositories-psql";

let getVehicleIDFromSlugService = makeGetVehicleIdFromSlugService(vehicleIdFromSlugRepository)

export {
    getVehicleIDFromSlugService
}
