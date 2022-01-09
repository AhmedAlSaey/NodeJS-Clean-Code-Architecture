import { VehicleIdFromSlugDTO } from "..";

export type VehicleIdFromSlugService = (slug: string) => Promise<VehicleIdFromSlugDTO>