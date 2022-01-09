export interface Formatter {
    format: (query: string, ...params) => string
}