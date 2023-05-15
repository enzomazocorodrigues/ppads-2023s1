import * as Dialog from "@radix-ui/react-dialog";

function Modal({ show, setShow, title, trigger, children, onConfirm, confirmText }) {
  return (
    <Dialog.Root open={show} onOpenChange={setShow} >
      <Dialog.Trigger asChild>
        {trigger}
      </Dialog.Trigger>
      <Dialog.Portal className="w-screen h-screen">
        <Dialog.Overlay className="w-screen h-screen bg-black/60 fixed inset-0" />
        <Dialog.Content className="absolute p-10 bg-white rounded-xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="text-2xl leading-tight font-bold">
            {title}
          </Dialog.Title>
          {children}
          <div className="flex flex-row items-center justify-end gap-6 mt-8">
            <Dialog.Close asChild>
              <button className="font-medium rounded-lg text-gray-400 hover:text-gray-500 focus:text-gray-500 focus:underline ring-0 outline-none">Cancelar</button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button type="button" onClick={onConfirm} className="flex items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-4 py-2 text-center">
                {confirmText}
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal;
