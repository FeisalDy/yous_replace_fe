'use client'
import { CommentsT } from '@/types/Comments'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Chip,
  Button
} from '@nextui-org/react'
import Rating from '@/components/Rating/Rating'
import { format } from 'date-fns'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

type BooksCardProps = {
  comments: CommentsT
}

// Function to format the content by replacing new lines with <br />
const formatContent = (content: string) => {
  return content.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ))
}

export default function CommentsCard ({ comments }: BooksCardProps) {
  //make the showmore state for all comments
  const [showMoreState, setShowMoreState] = useState<{
    [key: number]: boolean
  }>({})

  useEffect(() => {
    setShowMoreState({})
  }, [comments])

  const toggleShowMore = (index: number) => {
    setShowMoreState(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  if (!comments || !comments.data || comments.data.length === 0) {
    return <div>No comments available.</div>
  }

  return (
    // <div className='gap-2 grid grid-cols-1 md:grid-cols-2'>
    <div className='space-y-4'>
      {comments.data.map((comment, index) => (
        <Card
          className='w-full bg-card prose prose-invert'
          key={index}
          radius='none'
        >
          <CardHeader>
            <h2 className='capitalize'>{comment.creator.userName}</h2>
          </CardHeader>
          <CardBody>
            <p
              className={
                !showMoreState[index]
                  ? 'text-justify'
                  : 'line-clamp-3 text-justify'
              }
            >
              {formatContent(comment.content)}
            </p>
            <div className='flex flex-row-reverse mt-2'>
              {/* <Button className='' onClick={() => toggleShowMore(index)}>
                {showMoreState[index] ? 'Show Less' : 'Show More'}
              </Button> */}
            </div>
          </CardBody>
          <CardFooter>
            <div className='flex justify-between items-center w-full'>
              {/* <Rating isEditable={false} rating={comment.score} /> */}
              <Link href={`/${comment.book.bookId}`} color='foreground'>
                {comment.book.en_title}
              </Link>
              <Chip color='primary'>
                {format(new Date(comment.updateAt), 'yyyy-MM-dd')}
              </Chip>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
