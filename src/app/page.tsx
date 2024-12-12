import { getBooks } from '@/server/getBooks'
import { getComments } from '@/server/getComments'
import BooksCard from '@/components/Home/BooksCard'
import CommentsCard from '@/components/Home/CommentsCard'
import CustomPagination from '@/components/Pagination/Pagination'
import SearchField from '@/components/Search/SearchField'

type ShowType = 'book' | 'comment'

type Query = {
  page: number
  limit: number
  search: string | string[] | number | undefined
  searchBy?: string | string[] | number | undefined
}
export default async function Home ({
  searchParams
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | number | undefined
  }>
}) {
  const search = await searchParams

  const showType = (search.type as ShowType) || 'book'
  const page = Number(search.page) || 1
  const limit = Number(search.limit) || 10
  const searchTerm = search.search || ''
  const searchBy = search.searchBy || 'title'

  let query: Query = {
    page,
    limit,
    search: searchTerm,
    searchBy
  }

  const renderContent = {
    book: async () => {
      const books = await getBooks(query)
      return (
        <>
          <BooksCard books={books} />
          <div className='flex justify-center'>
            {books?.pagination && <CustomPagination data={books.pagination} />}
          </div>
        </>
      )
    },
    comment: async () => {
      const { searchBy, ...bookQuery } = query
      const comments = await getComments(bookQuery)
      return (
        <>
          <CommentsCard comments={comments} />
          <div className='flex justify-center'>
            {comments?.pagination && (
              <CustomPagination data={comments.pagination} />
            )}
          </div>
        </>
      )
    }
  }

  const content = await (renderContent[showType] || renderContent.book)()

  return (
    <div className='space-y-6'>
      <SearchField />
      {content}
    </div>
  )
}
