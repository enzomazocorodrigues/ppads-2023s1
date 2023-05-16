import React from 'react';
import * as SelectRoot from '@radix-ui/react-select';
import { CaretDown, Check } from '@phosphor-icons/react';

function Select({ value, onValueChange, items, placeholder }) {
  return (
    <SelectRoot.Root value={value} onValueChange={onValueChange}>
      <SelectRoot.Trigger className={`${value === null ? 'text-zinc-400' : ''} flex items-baseline justify-between gap-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white`}>
        {value === null ? placeholder : <SelectRoot.Value />}
        <SelectRoot.Icon>
          <CaretDown />
        </SelectRoot.Icon>
      </SelectRoot.Trigger>
      <SelectRoot.Portal>
        <SelectRoot.Content position="popper" className="relative translate-y-2 border border-gray-300 w-full rounded-lg bg-white">
          <SelectRoot.Viewport>
            {items
              .map(({ value, text }, i, arr) => (
                <>
                  <SelectItem className={`${i < arr.length - 1 ? 'border-0': 'rounded-b-lg'} ${i == 0 ? 'rounded-t-lg' : ''}`} value={value} key={value}>{text}</SelectItem>
                  {/* <Select.Separator className="h-[1px] bg-gray-300" /> */}
                </>
            ))}
          </SelectRoot.Viewport>
        </SelectRoot.Content>
      </SelectRoot.Portal>
    </SelectRoot.Root>
  )
}

const SelectItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => {
  return (
    <SelectRoot.Item className={`flex items-center gap-2 px-4 py-2 border-b border-gray-300 bg-white hover:bg-gray-50 focus:bg-gray-100 focus outline-none ring-0 cursor-pointer ${className}`} {...props} ref={forwardedRef}>
      <SelectRoot.ItemText>{children}</SelectRoot.ItemText>
      <SelectRoot.ItemIndicator>
        <Check />
      </SelectRoot.ItemIndicator>
    </SelectRoot.Item>
  );
});

export default Select;
