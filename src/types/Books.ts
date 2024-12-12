export type paramsT = {
  search?: string | number | string[] | undefined
  searchBy?: string | number | string[] | undefined
  sortBy?: string
  order?: string
  page?: string | number | string[] | undefined
  limit?: string | number | string[] | undefined
}

export type BooksT = {
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
  }[]
  pagination?: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
  error?: string
}
