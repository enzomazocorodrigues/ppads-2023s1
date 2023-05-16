import React from 'react';
import { Listbox } from '@headlessui/react'
import { CaretDown, Check } from '@phosphor-icons/react';

function MultipleSelect({ value, onValueChange, items, placeholder }) {
  function isSelected(item) {
    return value.includes(item)
  }

  const content = items
    .filter(item => value.includes(item.value))
    .map(item => item.text)
    .join(', ')

  return (
    <Listbox value={value} onChange={onValueChange} multiple>
      <Listbox.Button className={`${!value.length  ? 'text-zinc-400' : ''} flex items-baseline justify-between gap-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white`}>
        {!value.length ? placeholder : content}
        <CaretDown />
      </Listbox.Button>
      <Listbox.Options className="relative -translate-y-2 border border-gray-300 w-full rounded-lg bg-white">
        {items
          .map(({ value, text }, i, arr) => (
            <Listbox.Option
              className={`${i < arr.length - 1 ? 'border-0': 'rounded-b-lg'} ${i == 0 ? 'rounded-t-lg' : ''} flex justify-between items-center gap-2 px-4 py-2 border-b border-gray-300 bg-white hover:bg-gray-50 focus:bg-gray-100 focus outline-none ring-0 cursor-pointer`}
              key={i}
              value={value}
            >
              <span>{text}</span>
              {isSelected(value) && <Check />}
            </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}

export default MultipleSelect;
