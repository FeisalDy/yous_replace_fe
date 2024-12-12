'use client'
import { BookT } from '@/types/Book'
import { CommentsT } from '@/types/Comments'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import Rating from '@/components/Rating/Rating'
import { Chip } from '@nextui-org/chip'
import Pagination from '@/components/Pagination/Pagination'
import CommentsCard from '@/components/Home/CommentsCard'

type BooksCardProps = {
  data: BookT
}

export default function BookCard ({ data }: BooksCardProps) {
  const bookId = data?.data?.bookId
  const parsedComments: CommentsT = {
    data: data?.data?.comments.map(comment => ({
      id: comment.id,
      content: comment.content,
      score: comment.score,
      tags: comment.tags,
      updateAt: comment.updateAt,
      book: {
        bookId: bookId || 0,
        tags: data?.data?.tags || '',
        score: data?.data?.score || 0,
        scorerCount: data?.data?.scorerCount || 0,
        title: data?.data?.title || '',
        en_title: data?.data?.en_title || '',
        countWord: data?.data?.countWord || 0,
        author: data?.data?.author || '',
        cover: data?.data?.cover || ''
      },
      creator: {
        creatorId: comment.creator.id,
        userName: comment.creator.userName
      }
    })),
    pagination: data?.pagination
  }

  return (
    <>
      <Card>
        <div className='md:grid md:grid-cols-6 md:justify-items-stretch space-y-4'>
          <div className='col-span-2 justify-self-center px-2'>
            <Image
              src={data?.data?.cover}
              alt={data?.data?.title}
              className='w-full h-full'
              height={400}
            />
            <h3>{data?.data?.en_title}</h3>
            <p>{data?.data?.title}</p>
            <p>Author: {data?.data?.author}</p>
            <p>Word Count: {data?.data?.countWord}</p>
            <div className='flex'>
              <Rating
                isEditable={false}
                rating={data?.data?.score ? data?.data?.score / 2 : 0}
              ></Rating>
              <p>
                {data?.data?.score ? data?.data?.score / 2 : 0}(
                {data?.data?.scorerCount} User Ratings)
              </p>
            </div>
            {data?.data?.tags.split(',').map((tag, idx) => (
              <Chip color='warning' variant='dot' key={idx}>
                {tag.trim()}
              </Chip>
            ))}
          </div>
          <div className='col-span-4'>
            {/* {data?.data?.comments.map((comment, index) => (
              <div key={index} className='bg-card mb-2'>
                <Rating isEditable={false} rating={comment.score}></Rating>
                <p>{comment.updateAt}</p>
                <p>{comment.content}</p>
              </div>
            ))} */}
            <CommentsCard comments={parsedComments} />
            {data?.pagination && (
              <div className='flex justify-center mt-4'>
                <Pagination data={data?.pagination} />
              </div>
            )}
          </div>
        </div>
      </Card>
    </>
  )
}
