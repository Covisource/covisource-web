import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import axios from "axios";

// components
import TogglerButtons from "~localComponents/NewResourceModal/TogglerButtons";


const NewResourceModal = ({ isOpen, setIsOpen }) => {
  const initialFormData = {
    title: "",
    description: "",
    phone: "",
    category: "",
    location: {
      coordinates: {
        lat: "",
        long: "",
      },
      displayName: "",
    },
    price: "",
    extraParameters: [],
  };
  const [position, setPosition] = useState(1);
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/resource/newResource`,
        data: {
          resource: { ...formData },
        },
      });
      if (res) {
        // success
        setPosition(1);
        setFormData(initialFormData);
        setIsOpen(false);
      }
    } catch (err) {
      console.error(err);
      // handle error
    }
  };

  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-10 bg-black bg-opacity-90 overflow-y-auto"
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className="min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0" />

        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>

        {/* Actual Content */}
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl overflow-y-auto">
          {/* Header */}
          {/* <div className="flex items-center justify-between border-b border-gray-300 pb-3">
            <div>
              <Dialog.Title
                as="h3"
                className="text-xl ct-font-mont ct-text-color-1 font-bold"
              >
                Upload A Resource
              </Dialog.Title>
              <span className="text-sm">
                {position === 1 && "Step 1 - Basic Details"}
                {position === 2 && "Step 2 - Location"}
                {position === 3 && "Step 3 - Extra Parameters"}
              </span>
            </div>
            <div className="text-xs font-bold h-12 w-12 relative border-2 border-gray-900 rounded-full grid place-items-center">
              {position} of 3
            </div>
          </div> */}

          {/* Positions */}
          

          {/* Toggler Buttons */}
          <TogglerButtons
            position={position}
            setPosition={setPosition}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default NewResourceModal;
