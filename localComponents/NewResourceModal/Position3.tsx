import { useState } from "react";
import Input from "~components/Input";

const Position3 = ({ formData, setFormData, errs }) => {
  const [contactOption, setContactOption] = useState("");

  return (
    <>
      <div className="mt-5 flex flex-col gap-2">
        <div className="relative flex items-center ct-bg-muted p-3 rounded-lg">
          <div className="flex flex-col gap-1 w-full">
            <h1 className="font-bold">Contact</h1>
            <select
              value={contactOption}
              onChange={(e) => setContactOption(e.target.value)}
              className="p-0 w-full font-semibold border-none focus:ring-0 text-sm ct-text-muted ct-placeholder-muted ct-text-color-1 bg-transparent"
            >
              <option selected value="" className="ct-bg-muted">
                Choose Contact Option
              </option>
              <option value="whatsapp" className="ct-bg-muted">
                WhatsApp
              </option>
              <option value="email" className="ct-bg-muted">
                Email
              </option>
            </select>
          </div>
        </div>

        {contactOption === "whatsapp" && (
          <Input
            placeholder="Enter WhatsApp Number"
            heading="WhatsApp"
            className="ct-bg-muted p-3 rounded-lg"
            subClassName="ct-text-color-1 text-sm font-medium bg-transparent"
            prepend={<i className="fab fa-whatsapp font-bold text-lg"></i>}
            value={formData.positionThree?.phone}
            onChange={(e) => {
              const newFormData = { ...formData };
              newFormData.positionThree.phone = e.target.value;
              setFormData(newFormData);
            }}
          />
        )}

        {contactOption === "email" && (
          <Input
            placeholder="Enter Email Address"
            heading="Email"
            className="ct-bg-muted p-3 rounded-lg"
            subClassName="ct-text-color-1 text-sm font-medium bg-transparent"
            prepend={<i className="fas fa-at"></i>}
            value={formData.positionThree?.email}
            onChange={(e) => {
              const newFormData = { ...formData };
              newFormData.positionThree.email = e.target.value;
              setFormData(newFormData);
            }}
          />
        )}
      </div>
    </>
  );
};

export default Position3;
