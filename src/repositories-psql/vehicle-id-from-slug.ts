import {
    Database,
    VehicleIdFromSlugRepository,
    VehicleIDFromSlugParams,
    Formatter
} from "../models"

export class VehicleIdFromSlug implements VehicleIdFromSlugRepository {
    constructor(private readonly db: Database, private readonly formatter: Formatter) { }
    find = async (params: VehicleIDFromSlugParams) => {
        let selectionLevelQuery = this.formatter.format(`
        SELECT cs.vehicle_id, temporal_type
        FROM materialized_all_custom_view macv JOIN custom.car_slug cs ON macv.vehicle_id = cs.vehicle_id
        WHERE slug = %L
        `, params.slug)
        let vehicleIDResult: {
            vehicle_id: string,
            temporal_type: string
        }[] = await this.db.query(selectionLevelQuery)
        return vehicleIDResult.map(result => {
            return {
                vehicleId: result.vehicle_id,
                temporalType: result.temporal_type
            }
        })
    }
}