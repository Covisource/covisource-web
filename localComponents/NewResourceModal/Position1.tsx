import React, { useEffect, useState } from "react";

import {
  getAllResources,
  resourceSearchHandler,
} from "~util/searchablePopupUtil";

/// components
import SearchablePopup from "~components/SearchablePopup";
import Input from "~components/Input";
import { debounce } from "debounce";

const Position1 = ({ formData, setFormData }) => {
  const [allResources, setAllResources] = useState([]);

  useEffect(() => {
    const getResources = async () => {
      setAllResources((await getAllResources()) || []);
    };
    getResources();
  }, []);

  return (
    <>
      <div className="mt-5 flex flex-col gap-2">
        <Input
          placeholder="Title"
          subClassName="bg-gray-100"
          prepend={<i className="fal fa-text"></i>}
          onChange={(e) =>
            setFormData((cur) => ({
              ...cur,
              title: e.target.value,
            }))
          }
        />

        <Input
          type="tel"
          placeholder="Phone"
          subClassName="bg-gray-100"
          prepend={<i className="fal fa-phone"></i>}
          onChange={(e) =>
            setFormData((cur) => ({
              ...cur,
              phone: e.target.value,
            }))
          }
        />

        <SearchablePopup
          input={{
            subClassName: "bg-gray-100",
            prepend: <i className="fal fa-search"></i>,
            placeholder: "Choose a resource",
          }}
          searchHandler={{
            handler: resourceSearchHandler,
          }}
          resultClickHandler={{
            handler: ({ result, setInputValue, setIsVisible }) => {
              setInputValue(result.heading);
              setIsVisible(false);
              setFormData((cur) => ({
                ...cur,
                resource: result.heading,
                extraParameters: result.extraParameters,
              }));
            },
          }}
          whenInputEmpty={{
            componentArray: allResources.map((resource: any) => {
              return (
                <div className="flex flex-col justify-center gap-1 py-4 px-3 border-b border-gray-700 ct-text-color-3 select-none hover:bg-gray-900 cursor-pointer">
                  <span
                    className="truncate resource"
                    title={resource.heading}
                    id={`newResourceModal_dropdown_resource_${resource._id}`}
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
              setFormData((cur) => ({
                ...cur,
                resource: component.props.children.props.title,
              }));
            },
          }}
        />

        <textarea
          className="font-semibold border-none focus:ring-0 text-sm bg-gray-100 h-32 w-full border-0 rounded-lg"
          placeholder="Description"
          onChange={(e) =>
            setFormData((cur) => ({
              ...cur,
              description: e.target.value,
            }))
          }
        ></textarea>
      </div>
    </>
  );
};

export default React.memo(Position1);
