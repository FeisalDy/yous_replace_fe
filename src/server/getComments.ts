'use server'
import { paramsT, CommentsT } from '@/types/Comments'

export async function getComments (params?: paramsT): Promise<CommentsT> {
  const query = new URLSearchParams(params as Record<string, string>).toString()
  console.log('q', query)
  const res = await fetch(`${process.env.API_URL}/api/comments/search?${query}`)

  if (!res.ok) {
    throw new Error('Failed to fetch comments')
  }

  const data: CommentsT = await res.json()
  return data
}
