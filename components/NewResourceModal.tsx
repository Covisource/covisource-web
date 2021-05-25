import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import axios from "axios";

// components
import TogglerButtons from "~localComponents/NewResourceModal/TogglerButtons";
import Header from "~localComponents/NewResourceModal/Header";
import Positions from "~localComponents/NewResourceModal/Positions";

const NewResourceModal = ({ isOpen, setIsOpen }) => {
  const initialFormData = {
    positionOne: {
      title: "",
      description: "",
      phone: "",
      category: {
        name: "",
        id: "",
      },
      price: "",
      quantity: "",
    },
    positionTwo: {
      location: {
        coordinates: {
          lat: "",
          long: "",
        },
        displayName: "",
      },
    },
    positionThree: {
      method: "",
      email: "",
      phone: "",
    },
    positionFour: {
      extraParameters: [],
    },
  };
  const [position, setPosition] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [errs, setErrs] = useState({
    positionOne: {},
    positionTwo: {},
    positionThree: {},
    positionFour: {},
  });

  const handleSubmit = async () => {
    validate();
    // try {
    //   const res = await axios({
    //     method: "POST",
    //     url: `${process.env.NEXT_PUBLIC_SERVER_URL}/resource/newResource`,
    //     data: {
    //       resource: { ...formData },
    //     },
    //   });
    //   if (res) {
    //     // success
    //     setPosition(1);
    //     setFormData(initialFormData);
    //     setIsOpen(false);
    //   }
    // } catch (err) {
    //   console.error(err);
    //   // handle error
    // }
  };

  const validate = () => {
    /*
      err convention: {
        errLocation: errorMessage
      }
    */

    if (position === 1) {
      if (!formData.positionOne.title) {
        const newErrs: any = { ...errs };
        newErrs.positionOne.title = "Please Fill Out This Field.";
        setErrs(newErrs);
      } else {
        const newErrs: any = { ...errs };
        delete newErrs.positionOne.title;
        setErrs(newErrs);
      }

      if (!formData.positionOne.category.id) {
        const newErrs: any = { ...errs };
        newErrs.positionOne.category = "Please Fill Out This Field.";
        setErrs(newErrs);
      } else {
        const newErrs: any = { ...errs };
        delete newErrs.positionOne.category;
        setErrs(newErrs);
      }
      // if everything is valid, return true
      if (Object.keys(errs.positionOne).length === 0) {
        return true;
      } else {
        return false;
      }
    }

    if (position === 2) {
      if (
        !formData.positionTwo.location.coordinates ||
        !formData.positionTwo.location.displayName
      ) {
        const newErrs: any = { ...errs };
        newErrs.positionTwo.location = "Please Choose A Location";
        setErrs(newErrs);
      } else {
        const newErrs: any = { ...errs };
        delete newErrs.positionTwo.location;
        setErrs(newErrs);
      }

      // if everything is valid, return true
      if (Object.keys(errs.positionTwo).length === 0) {
        return true;
      } else {
        return false;
      }
    }

    if (position === 3) {
      if (!formData.positionThree.method) {
        const newErrs: any = { ...errs };
        newErrs.positionThree.method = "Please Choose A Method";
        setErrs(newErrs);
      } else {
        const newErrs: any = { ...errs };
        delete newErrs.positionThree.method;
        setErrs(newErrs);
      }

      if (
        formData.positionThree.method === "email" &&
        !formData.positionThree.email
      ) {
        const newErrs: any = { ...errs };
        newErrs.positionThree.email = "Please Fill Out This Field.";
        setErrs(newErrs);
      } else {
        const newErrs: any = { ...errs };
        delete newErrs.positionThree.email;
        setErrs(newErrs);
      }

      if (
        formData.positionThree.method === "phone" &&
        !formData.positionThree.phone
      ) {
        const newErrs: any = { ...errs };
        newErrs.positionThree.phone = "Please Fill Out This Field.";
        setErrs(newErrs);
      } else {
        const newErrs: any = { ...errs };
        delete newErrs.positionThree.phone;
        setErrs(newErrs);
      }

      // if everything is valid, return true
      if (Object.keys(errs.positionThree).length === 0) {
        return true;
      } else {
        return false;
      }
    }

    if (position === 4) {
      formData.positionFour.extraParameters.map((param) => {
        if (param.required && !param.value) {
          const newErrs: any = { ...errs };
          newErrs.positionFour[param.name] = "Please Fill Out This Field.";
          setErrs(newErrs);
        } else {
          const newErrs: any = { ...errs };
          delete newErrs.positionFour[param.name];
          setErrs(newErrs);
        }
      });

      // if everything is valid, return true
      if (Object.keys(errs.positionFour).length === 0) {
        return true;
      } else {
        return false;
      }
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
        <div className="bg-white rounded-lg inline-flex w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform ">
          <div className="w-full">
            <Header
              position={position}
              setPosition={setPosition}
              setIsOpen={setIsOpen}
            />

            <Positions
              formData={formData}
              setFormData={setFormData}
              position={position}
              errs={errs}
            />

            <TogglerButtons
              position={position}
              setPosition={setPosition}
              handleSubmit={handleSubmit}
              validate={validate}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default NewResourceModal;
