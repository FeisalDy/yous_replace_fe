import { getBook } from '@/server/getBook'
import BookCard from '@/components/Home/BookCard'

export default async function BookPage ({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { id } = await params
  const search = await searchParams

  const query: Record<string, string | boolean | number> = {
    bookId: id,
    includesComment: true
  }

  if (search?.page) {
    query.page = Number(search.page)
  }

  if (search?.limit) {
    query.limit = Number(search.limit)
  }

  const data = await getBook(query)

  return (
    <>
      <BookCard data={data} />
    </>
  )
}
