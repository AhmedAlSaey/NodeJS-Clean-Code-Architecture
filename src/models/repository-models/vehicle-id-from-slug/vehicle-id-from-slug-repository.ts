import { Repository, VehicleIDFromSlugReturn } from "../..";
import { VehicleIDFromSlugParams } from "../..";

export interface VehicleIdFromSlugRepository extends Repository {
    find: (param: VehicleIDFromSlugParams) => Promise<VehicleIDFromSlugReturn[]>
}