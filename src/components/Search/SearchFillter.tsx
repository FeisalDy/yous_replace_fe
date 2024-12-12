'use client'
import { Select, SelectItem } from '@nextui-org/react'

export default function SearchFillter () {
  const animals = [
    { key: 'cat', label: 'Cat' },
    { key: 'dog', label: 'Dog' }
  ]

  const variants = ['flat', 'bordered', 'underlined', 'faded']

  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='flex w-full'>
        <Select variant='faded' label='Select an animal' className='max-w-xs'>
          {animals.map(animal => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
          ))}
        </Select>
      </div>
    </div>
  )
}
