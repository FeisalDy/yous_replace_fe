export type ParamsT = {
  id?: string
  title?: string
  includesComment?: boolean
  cursor?: string
}
export type BookT = {
  data?: {
    bookId: number
    tags: string
    score: number
    scorerCount: number
    title: string
    en_title: string
    countWord: number
    author: string
    cover: string
    comments: {
      id: string
      content: string
      score: number
      tags: string
      updateAt: string
      creator: {
        id: number
        userName: string
      }
    }[]
  }
  pagination?: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
  error?: string
}
