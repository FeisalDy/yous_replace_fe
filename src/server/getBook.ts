'use server'
import { ParamsT, BookT } from '@/types/Book'

export async function getBook (params?: ParamsT): Promise<BookT> {
  const query = new URLSearchParams(params as Record<string, string>).toString()
  const res = await fetch(`${process.env.API_URL}/api/book?${query}`)

  if (!res.ok) {
    throw new Error('Failed to fetch books')
  }

  const data: BookT = await res.json()
  return data
}
