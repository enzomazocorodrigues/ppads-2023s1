import * as Dialog from '@radix-ui/react-dialog';
import { CheckCircle } from '@phosphor-icons/react';

function SuccessModal({ open, onOpenChange }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="w-screen h-screen bg-black/70 fixed inset-0" />
        <Dialog.Content className="absolute p-10 flex flex-col gap-8 items-center bg-white rounded-lg w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
          <CheckCircle size={96} className='text-green-600' />
          <Dialog.Title>
            <span className="text-xl font-semibold text-slate-900 text-center">
              Sua chamada foi registrada com sucesso
            </span>
          </Dialog.Title>
          <Dialog.Close asChild>
            <a href="/" className="flex items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-4 py-2 text-center">
              Voltar para o início
            </a>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default SuccessModal
