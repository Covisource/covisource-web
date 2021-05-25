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
          value={formData.positionOne?.title}
          onChange={(e) => {
            const newFormData = { ...formData };
            newFormData.positionOne.title = e.target.value;
            setFormData(newFormData);
          }}
        />

        <SearchablePopup
          input={{
            className: "ct-bg-muted p-3 rounded-lg",
            subClassName: "ct-text-color-1 text-sm font-medium bg-transparent",
            placeholder: "Choose a resource",
            heading: "Resource",
            prepend: <i className="fas fa-shapes"></i>,
            value: formData.positionOne.category.name,
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

              const newFormData = { ...formData };
              newFormData.positionOne.category.id = result._id;
              newFormData.positionOne.category.name = result.heading;
              newFormData.positionFour.extraParameters = result.extraParameters;
              setFormData(newFormData);
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

              const newFormData = { ...formData };
              newFormData.positionOne.category.id =
                component.props.children.props.id.split(
                  "newResourceModal_dropdown_resource_"
                )[1];
              newFormData.positionOne.category.name =
                component.props.children.props.title;

              setFormData(newFormData);
            },
          }}
        />

        <div className="flex gap-1">
          <Input
            type="number"
            heading="Quantity"
            placeholder="Enter The Quantity"
            className="ct-bg-muted p-3 rounded-lg w-1/2"
            subClassName="ct-text-color-1 text-sm font-medium bg-transparent"
            prepend={<i className="fas fa-tally"></i>}
            value={formData.positionOne?.quantity}
            onChange={(e) => {
              const newFormData = { ...formData };
              newFormData.positionOne.quantity = e.target.value;
              setFormData(newFormData);
            }}
          />
          <Input
            type="number"
            heading="Price"
            placeholder="Enter The Price"
            className="ct-bg-muted p-3 rounded-lg w-1/2"
            subClassName="ct-text-color-1 text-sm font-medium bg-transparent"
            prepend={<i className="fas fa-rupee-sign"></i>}
            value={formData.positionOne?.price}
            onChange={(e) => {
              const newFormData = { ...formData };
              newFormData.positionOne.price = e.target.value;
              setFormData(newFormData);
            }}
          />
        </div>

        <div className="relative flex ct-bg-muted p-3 rounded-lg">
          <i className="fas fa-comment-alt-medical pt-2"></i>
          <div className="flex flex-col gap-1 w-full ml-6">
            <h1 className="font-bold">Description</h1>
            <textarea
              placeholder="Enter A Description"
              className="p-0 w-full h-28 font-semibold border-none focus:ring-0 text-sm ct-text-muted ct-placeholder-muted bg-transparent resize-none"
              value={formData.positionOne?.description}
              onChange={(e) => {
                const newFormData = { ...formData };
                newFormData.positionOne.description = e.target.value;
                setFormData(newFormData);
              }}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Position1);
