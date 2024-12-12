'use client'
import { BooksT } from '@/types/Books'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button
} from '@nextui-org/react'
import { Chip } from '@nextui-org/chip'
import Rating from '@/components/Rating/Rating'
import { Link } from '@nextui-org/react'
import { addThousandSeparators } from '@/utils/separators'
type BooksCardProps = {
  books: BooksT
}
export default function BooksCard ({ books }: BooksCardProps) {
  return (
    <div className='gap-2 grid grid-cols-1 md:grid-cols-2'>
      {books?.data?.map((book, index) => (
        <Card className='w-full bg-card' key={index} radius='none'>
          <div className='flex flex-row space-x-2 prose prose-invert'>
            <div className='basis-1/4 not-prose'>
              <Image
                src={book.cover}
                alt={book.title}
                className='w-full h-full object-cover'
                radius='none'
              />
            </div>
            <div className='basis-3/4'>
              <Link href={`${book.bookId}`} color='foreground'>
                <h2 className='capitalize'>{book.en_title}</h2>
              </Link>
              <p>Author: {book.author}</p>
              <p>Word Count: {addThousandSeparators(book.countWord)}</p>
              <div className='flex'>
                <Rating isEditable={false} rating={book.score / 2}></Rating>
                {book.score / 2}
              </div>
              {book.tags &&
                book.tags.split(',').map((tag, idx) => (
                  <Chip color='warning' variant='dot' key={idx}>
                    {tag.trim()}
                  </Chip>
                ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
