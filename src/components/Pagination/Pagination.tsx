'use client'
import {
  Pagination,
  PaginationItemType,
  PaginationItemRenderProps
} from '@nextui-org/react'
import { ChevronIcon } from './ChevronIcon'
import { cn } from '@/utils/cn'
import { useRouter, useSearchParams } from 'next/navigation'

type PaginationT = {
  total: number
  page: number
  limit: number
  totalPages: number
}
type Prop = {
  data: PaginationT
}
export default function CustomPagination ({ data }: Prop) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString() || '')
    params.set('page', String(page))

    router.push(`?${params.toString()}`)
  }

  const renderItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className
  }: PaginationItemRenderProps) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button
          key={key}
          className={cn(className, 'bg-default-200/50 min-w-8 w-8 h-8')}
          onClick={onNext}
        >
          <ChevronIcon className='rotate-180' />
        </button>
      )
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          key={key}
          className={cn(className, 'bg-default-200/50 min-w-8 w-8 h-8')}
          onClick={onPrevious}
        >
          <ChevronIcon />
        </button>
      )
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button key={key} className={className}>
          ...
        </button>
      )
    }

    // cursor is the default item
    return (
      <button
        ref={ref}
        key={key}
        className={cn(
          className,
          isActive &&
            'text-white bg-gradient-to-br from-indigo-500 to-pink-500 font-bold'
        )}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    )
  }

  return (
    <Pagination
      disableCursorAnimation
      showControls
      total={data?.totalPages}
      page={data?.page}
      onChange={handlePageChange}
      className='mb-0'
      radius='full'
      renderItem={renderItem}
      variant='light'
    />
  )
}
