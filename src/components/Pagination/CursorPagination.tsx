'use client'
import React from 'react'
import { ChevronIcon } from './ChevronIcon'
import { cn } from '@/utils/cn'
import { useRouter, useSearchParams } from 'next/navigation'
import { Pagination, Button } from '@nextui-org/react'

type PaginationT = {
  nextCursor: string | null
  total: number
  limit: number
  totalPages: number
}

type Prop = {
  data: PaginationT
}
export default function CursorPagination ({ data }: Prop) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleNext = () => {
    const params = new URLSearchParams(searchParams?.toString() || '')
    if (data.nextCursor) {
      params.set('cursor', data.nextCursor)
    }
    router.push(`?${params.toString()}`)
  }

  return (
    <div className='flex flex-col gap-5'>
      <p className='text-small text-default-500'>
        Selected Page: {data.nextCursor}
      </p>
      <div className='flex gap-2'>
        <Button
          size='sm'
          variant='flat'
          color='secondary'
          onPress={() => router.back()}
        >
          Previous
        </Button>
        <Button
          size='sm'
          variant='flat'
          color='secondary'
          onPress={handleNext}
          disabled={data.nextCursor === null}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
