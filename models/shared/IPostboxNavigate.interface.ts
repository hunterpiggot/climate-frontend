export interface IPostboxNavigate<T = void> {
  route: {
    key: string
    path: string
  }
  params?: T
}
