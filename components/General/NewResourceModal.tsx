import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const NewResourceModal = ({ isOpen, setIsOpen }) => {
  console.log(isOpen);
  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-10 bg-black bg-opacity-90 overflow-y-auto"
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className="min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0" />

        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="flex items-center justify-between border-b border-gray-300 pb-3">
            <div>
              <Dialog.Title
                as="h3"
                className="text-xl ct-font-mont ct-text-color-1 font-bold"
              >
                Upload A Resource
              </Dialog.Title>
              <span className="text-sm">Step 1 - Basic Details</span>
            </div>
            <span className="text-xs font-bold h-12 w-12 border-2 border-gray-900 rounded-full grid place-items-center">
              1 of 3
            </span>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem
              quaerat beatae iure aliquam sunt harum. Eaque deserunt incidunt
              voluptates? Ducimus nobis soluta repudiandae repellendus tenetur
              distinctio necessitatibus, aspernatur consectetur vitae.
            </p>
          </div>

          <div className="mt-4">
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              onClick={() => setIsOpen(false)}
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default NewResourceModal;
