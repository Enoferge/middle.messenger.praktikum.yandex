export interface Response<TResponse> {
  statusCode: number,
  data: TResponse
}

type ErrorReason = {
  reason: string
}

export type ResponseError = Response<ErrorReason>
