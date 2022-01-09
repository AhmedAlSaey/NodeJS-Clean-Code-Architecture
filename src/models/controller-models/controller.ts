import { HTTPRequest } from ".."

export type Controller = (httpRequest: HTTPRequest) => Promise<HTTPRequest>