import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import axios from "axios";

// components
import TogglerButtons from "~localComponents/NewResourceModal/TogglerButtons";
import Header from "~localComponents/NewResourceModal/Header";
import Positions from "~localComponents/NewResourceModal/Positions";

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
        {/* Closes the modal when clicked outside of */}
        <Dialog.Overlay className="fixed inset-0" />

        {/* Centers the Modal */}
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>

        {/* Actual Content */}
        <div className="bg-white rounded-lg inline-flex w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform ">
          <div className="w-full">
            <Header position={position} setPosition={setPosition} />

            <Positions
              formData={formData}
              setFormData={setFormData}
              position={position}
            />

            <TogglerButtons
              position={position}
              setPosition={setPosition}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default NewResourceModal;
