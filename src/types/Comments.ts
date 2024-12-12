export type paramsT = {
  search: string | string[] | number | undefined
  page: string | string[] | number | undefined
  limit: string | string[] | number | undefined
}
export type CommentsT = {
  data?: {
    id: string
    content: string
    score: number
    tags: string
    updateAt: string
    book: {
      bookId: number
      tags: string
      score: number
      scorerCount: number
      title: string
      en_title: string
      countWord: number
      author: string
      cover: string
    }
    creator: {
      creatorId: number
      userName: string
    }
  }[]
  pagination?: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
  error?: string
}
