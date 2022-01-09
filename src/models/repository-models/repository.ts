export interface Repository {
    find: (params: any) => Promise<any[]>
}