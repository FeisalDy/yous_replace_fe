'use client'
import { Button, Input, RadioGroup, Radio, Checkbox } from '@nextui-org/react'
import { SearchIcon } from './SearchIcon'
import { useRouter, useSearchParams } from 'next/navigation'
import { useRef, useState, useEffect } from 'react'

export default function SearchField () {
  const router = useRouter()
  const searchParams = useSearchParams()
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedCheckbox, setSelectedCheckbox] = useState<string | null>(
    () => searchParams?.get('type') || 'book'
  )
  const [searchByCheckbox, setSearchByCheckbox] = useState<string>(
    () => searchParams?.get('searchBy') || 'title'
  )

  useEffect(() => {
    const searchValue = searchParams?.get('search') || ''
    if (inputRef.current) {
      inputRef.current.value = searchValue
    }
  }, [searchParams])

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams?.toString() || '')
    const searchValue = inputRef.current?.value || ''

    if (searchValue) {
      params.set('search', searchValue)
    } else {
      params.delete('search')
    }

    params.set('searchBy', searchByCheckbox)
    params.set('type', selectedCheckbox || '')

    router.push(`?${params.toString()}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleCheckboxChange = (value: string) => {
    setSelectedCheckbox(selectedCheckbox === value ? null : value)
  }
  const handlesearchByCheckbox = (value: string) => {
    setSearchByCheckbox(searchByCheckbox === value ? '' : value)
  }

  return (
    <div className='w-full flex flex-wrap shadow-lg'>
      <Input
        isClearable
        radius='none'
        ref={inputRef}
        classNames={{
          label: 'text-black/50 dark:text-white/90',
          input: [
            'bg-transparent',
            'text-black/90 dark:text-white/90',
            'placeholder:text-default-700/50 dark:placeholder:text-white/60'
          ],
          innerWrapper: 'bg-transparent',
          inputWrapper: [
            'shadow-xl',
            'bg-default-200/50',
            'dark:bg-default/60',
            'backdrop-blur-xl',
            'backdrop-saturate-200',
            'hover:bg-default-200/70',
            'dark:hover:bg-default/70',
            'group-data-[focus=true]:bg-default-200/50',
            'dark:group-data-[focus=true]:bg-default/60',
            '!cursor-text'
          ]
        }}
        onKeyDown={handleKeyDown}
        placeholder='Type to search...'
        startContent={
          <SearchIcon className='text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0' />
        }
        endContent={
          <Button color='primary' onClick={handleSearch}>
            Search
          </Button>
        }
      />
      <div className='space-y-6'>
        <div className=''>
          <label className='block mb-2'>Search By</label>
          <Checkbox
            isSelected={selectedCheckbox === 'book'}
            onChange={() => handleCheckboxChange('book')}
          >
            Books
          </Checkbox>
          <Checkbox
            isSelected={selectedCheckbox === 'comment'}
            onChange={() => handleCheckboxChange('comment')}
          >
            Comments
          </Checkbox>
        </div>
        <div className={selectedCheckbox === 'book' ? '' : 'hidden'}>
          <label className='block mb-2'>Search By</label>
          <Checkbox
            isSelected={searchByCheckbox === 'title'}
            onChange={() => handlesearchByCheckbox('title')}
          >
            Title
          </Checkbox>
          <Checkbox
            isSelected={searchByCheckbox === 'author'}
            onChange={() => handlesearchByCheckbox('author')}
          >
            Author
          </Checkbox>
          <Checkbox
            isSelected={searchByCheckbox === 'tags'}
            onChange={() => handlesearchByCheckbox('tags')}
          >
            Tag
          </Checkbox>
        </div>
      </div>
    </div>
  )
}
