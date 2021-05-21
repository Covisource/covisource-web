import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";

// positions
import Position1 from "localComponents/NewResourceModal/Position1";
import Position2 from "localComponents/NewResourceModal/Position2";
import Position3 from "localComponents/NewResourceModal/Position3";

// buttons
import Button from "~components/Button";

// styles
import styles from "~styles/NewResourceModal.module.css";
import axios from "axios";

const NewResourceModal = ({ isOpen, setIsOpen }) => {
  const [position, setPosition] = useState(1);
  const [formData, setFormData] = useState({
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
  });

  const handleSubmit = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/resource/newResource`,
        data: {
          resource: { ...formData },
        },
      });
      console.log(res);
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
          <div className="flex items-center justify-between border-b border-gray-300 pb-3">
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
            {/* <div
              className="text-xs font-bold h-12 w-12 relative border-2 border-gray-900 rounded-full grid place-items-center"
            >
              {position} of 3
            </div> */}

            <div className="relative inline-block">
              <div className={styles.progressCircle}>
                <div
                  className={styles.segment}
                  style={{ transform: "rotate(0deg) skew(0deg)" }}
                ></div>
                <div
                  className={styles.segment}
                  style={{ transform: "rotate(90deg) skew(0deg)" }}
                ></div>
              </div>
              <div className={styles.progressInner}></div>
            </div>
          </div>

          {/* Buttons */}
          {position === 1 && (
            <Position1 formData={formData} setFormData={setFormData} />
          )}
          {position === 2 && (
            <Position2 formData={formData} setFormData={setFormData} />
          )}
          {position === 3 && (
            <Position3 formData={formData} setFormData={setFormData} />
          )}

          {/* Toggler Buttons */}
          <div className="mt-4 w-full flex items-center gap-2 justify-end">
            {position > 1 && (
              <Button
                className="rounded-lg bg-gray-200"
                onClick={() => setPosition((curr) => curr - 1)}
              >
                Previous
              </Button>
            )}
            {position < 3 && (
              <Button
                className="ct-bg-accent ct-text-color-3 rounded-lg"
                onClick={() => setPosition((curr) => curr + 1)}
              >
                Next
              </Button>
            )}
            {position === 3 && (
              <Button
                className="ct-bg-grad ct-text-color-3 rounded-lg"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default NewResourceModal;
