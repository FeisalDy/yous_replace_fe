'use server'
import { paramsT, BooksT } from '@/types/Books'

export async function getBooks (params?: paramsT): Promise<BooksT> {
  const query = new URLSearchParams(params as Record<string, string>).toString()
  console.log('q', query)
  const res = await fetch(`${process.env.API_URL}/api/books?${query}`)

  if (!res.ok) {
    throw new Error('Failed to fetch books')
  }

  const data: BooksT = await res.json()
  return data
}
