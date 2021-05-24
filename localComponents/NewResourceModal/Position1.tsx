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
          placeholder="Enter Resource Title"
          heading="Title"
          className="ct-bg-muted p-3 rounded-lg"
          subClassName="ct-text-color-1 text-sm font-medium bg-transparent"
          prepend={<i className="fas fa-font-case"></i>}
          value={formData.title}
          onChange={(e) =>
            setFormData((cur) => ({
              ...cur,
              title: e.target.value,
            }))
          }
        />

        {/* <Input
          type="tel"
          heading="Phone"
          placeholder="Enter Phone Number"
          className="ct-bg-muted p-3 rounded-lg"
          subClassName="ct-text-color-1 text-sm font-medium bg-transparent"
          prepend={<i className="fas fa-phone"></i>}
          value={formData.phone}
          onChange={(e) =>
            setFormData((cur) => ({
              ...cur,
              phone: e.target.value,
            }))
          }
        /> */}

        <SearchablePopup
          input={{
            className: "ct-bg-muted p-3 rounded-lg",
            subClassName: "ct-text-color-1 text-sm font-medium bg-transparent",
            placeholder: "Choose a resource",
            heading: "Resource",
            prepend: <i className="fas fa-shapes"></i>,
            value: formData.category,
          }}
          searchHandler={{
            handler: resourceSearchHandler,
          }}
          dropdown={{
            className: "bg-white w-full shadow-xl",
            result: {
              containerClassName: "border-b border-gray-100 hover:bg-gray-100",
              headingClassName: "ct-text-color-1",
              subHeadingClassName: "text-gray-300",
            },
          }}
          resultClickHandler={{
            handler: ({ result, setInputValue, setIsVisible }) => {
              setInputValue(result.heading);
              setIsVisible(false);
              setFormData((cur) => ({
                ...cur,
                category: result._id,
                extraParameters: result.extraParameters,
              }));
            },
          }}
          whenInputEmpty={{
            componentArray: allResources.map((resource: any) => {
              return (
                <div className="flex flex-col justify-center gap-1 py-4 px-3 ct-text-color-1 select-none border-b border-gray-100 hover:bg-gray-100 cursor-pointer">
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
                category: component.props.children.props.id.split(
                  "newResourceModal_dropdown_resource_"
                )[1],
              }));
            },
          }}
        />

        <div className="relative flex ct-bg-muted p-3 rounded-lg">
          <i className="fas fa-comment-alt-medical pt-2"></i>
          <div className="flex flex-col gap-1 w-full ml-6">
            <h1 className="font-bold">Description</h1>
            <textarea
              placeholder="Enter A Description"
              value={formData.description}
              className="p-0 w-full h-28 font-semibold border-none focus:ring-0 text-sm ct-text-muted ct-placeholder-muted bg-transparent resize-none"
              onChange={(e) =>
                setFormData((cur) => ({
                  ...cur,
                  description: e.target.value,
                }))
              }
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Position1);
