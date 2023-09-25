'use client';

function Modal({children, closeModal}) {
  return(
    <div className="fixed inset-0 z-40 flex justify-center bg-black/60 items-center">
          <div className="bg-white rounded-md py-5 px-7 md:w-[40%] w-[100%]">
            <div className="flex justify-end items-end">
              <button
                  onClick={() => closeModal(false)}
                  className="text-black hover:text-blue-500">
                  X
              </button>
            </div>
            {children}
          </div>
    </div>
  )
}


export default Modal;
