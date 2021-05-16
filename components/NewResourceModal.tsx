import { Dialog } from "@headlessui/react";

// components
import Input from "~components/Input";
import Button from "~components/Button";
import SearchablePopup from "~components/SearchablePopup";

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
          <div className="mt-5 flex flex-col gap-2">
            <Input
              placeholder="Title"
              subClassName="bg-gray-100"
              prepend={<i className="fal fa-text"></i>}
            />
            {/* <SearchablePopup
              inputSubClassName="text-sm font-medium bg-gray-100"
              inputPrepend={<i className="fal fa-search text-lg"></i>}
              loader={true}
              inputPlaceholder="Category"
            /> */}
            <textarea
              className="font-semibold border-none focus:ring-0 text-sm bg-gray-100 h-32 w-full border-0 rounded-lg"
              placeholder="Description"
            ></textarea>
          </div>

          <div className="mt-4 w-full text-right">
            <Button className="ct-bg-accent ct-text-color-3 rounded-lg">
              Next
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default NewResourceModal;
