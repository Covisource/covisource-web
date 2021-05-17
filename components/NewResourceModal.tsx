import { Dialog } from "@headlessui/react";

// components
import Input from "~components/Input";
import Button from "~components/Button";
import SearchablePopup from "~components/SearchablePopup";
import {
  getAllResources,
  resourceSearchHandler,
} from "~util/searchablePopupUtil";
import { useEffect, useState } from "react";

const NewResourceModal = ({ isOpen, setIsOpen }) => {
  const [allResources, setAllResources] = useState([]);

  useEffect(() => {
    const getResources = async () => {
      setAllResources((await getAllResources()) || []);
    };
    getResources();
  });

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

            <SearchablePopup
              input={{
                subClassName: "bg-gray-100",
                prepend: <i className="fal fa-search"></i>,
                placeholder: "Find Resources...",
              }}
              searchHandler={{
                handler: resourceSearchHandler,
              }}
              resultClickHandler={{
                handler: ({ result, setInputValue, setIsVisible }) => {
                  setInputValue(result.heading);
                  setIsVisible(false);
                },
              }}
              whenInputEmpty={{
                componentArray: allResources.map((resource: any) => {
                  return (
                    <div className="flex flex-col justify-center gap-1 py-4 px-3 border-b border-gray-700 ct-text-color-3 select-none hover:bg-gray-900 cursor-pointer">
                      <span
                        className="truncate resource"
                        title={resource.heading}
                      >
                        {resource.heading}
                      </span>
                    </div>
                  );
                }),
                componentClickHandler: ({
                  component,
                  setInputValue,
                  setIsVisible,
                }) => {
                  setInputValue(component.props.children.props.title);
                  setIsVisible(false);

                  console.log(component);
                },
              }}
            />

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
