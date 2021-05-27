import { useState } from "react";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { useSession } from "next-auth/client";

// schemas
import SessionSchema from "~schema/SessionSchema";

// components
import TogglerButtons from "~localComponents/NewResourceModal/TogglerButtons";
import Header from "~localComponents/NewResourceModal/Header";
import Positions from "~localComponents/NewResourceModal/Positions";

const NewResourceModal = ({ isOpen, setIsOpen }) => {
  const user: SessionSchema = useSession()[0] as any;

  const phoneRegex = new RegExp(
    "^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$"
  );
  const emailRegex = new RegExp(
    "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])"
  );
  const initialFormData = {
    positionOne: {
      title: "",
      description: "",
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
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/resource/newResource`,
        data: {
          resource: {
            title: formData.positionOne.title,
            category: formData.positionOne.category.id,
            description: formData.positionOne.description || "",
            price: formData.positionOne.price || "",
            quantity: formData.positionOne.quantity || "",
            location: {
              displayName: formData.positionTwo.location.displayName,
              coordinates: {
                lat: formData.positionTwo.location.coordinates.lat,
                long: formData.positionTwo.location.coordinates.long,
              },
            },
            phone: formData.positionThree.phone || "",
            email: formData.positionThree.email || "",
            method: formData.positionThree.method,
            extraParameters: formData.positionFour.extraParameters,
          },
        },
        headers: {
          Authorization: user?.jwt ? `token ${user.jwt}` : "",
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

  const validate = () => {
    /*
      err convention: {
        errLocation: errorMessage
      }
    */

    switch (position) {
      case 1:
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

      case 2:
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
      case 3:
        if (!formData.positionThree.method) {
          const newErrs: any = { ...errs };
          newErrs.positionThree.method = "Please Choose A Method";
          setErrs(newErrs);
        } else {
          const newErrs: any = { ...errs };
          delete newErrs.positionThree.method;
          setErrs(newErrs);
        }

        switch (formData.positionThree.method) {
          case "email":
            if (!formData.positionThree.email) {
              const newErrs: any = { ...errs };
              newErrs.positionThree.email = "Please Fill Out This Field.";
              setErrs(newErrs);
            } else {
              const newErrs: any = { ...errs };
              delete newErrs.positionThree.email;
              if (!emailRegex.test(formData.positionThree.email)) {
                newErrs.positionThree.email = "Invalid Email Address";
              }
              setErrs(newErrs);
            }
            break;

          case "phone":
            if (!formData.positionThree.phone) {
              const newErrs: any = { ...errs };
              newErrs.positionThree.phone = "Please Fill Out This Field.";
              setErrs(newErrs);
            } else {
              const newErrs: any = { ...errs };
              delete newErrs.positionThree.phone;
              if (!phoneRegex.test(formData.positionThree.phone)) {
                newErrs.positionThree.phone = "Invalid Phone Number";
              }
              setErrs(newErrs);
            }
            break;
        }

        if (Object.keys(errs.positionThree).length === 0) {
          // if everything is valid, return true
          return true;
        } else {
          console.log("false");
          console.log(errs.positionThree);
          console.log(formData.positionThree.method);
          return false;
        }
      case 4:
        formData.positionFour.extraParameters.map((param) => {
          if (param.isRequired && !param.value) {
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
        <div className="bg-white rounded-lg inline-flex h-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform ">
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
