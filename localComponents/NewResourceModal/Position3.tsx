import { debounce } from "debounce";
import Input from "~components/Input";

const Position3 = ({ formData, setFormData }) => {
  return (
    <>
      <div className="mt-5 flex flex-col gap-2">
        <Input
          type="number"
          placeholder="Price"
          subClassName="bg-gray-100"
          prepend={<i className="fal fa-rupee-sign"></i>}
          onChange={debounce(
            (e) =>
              setFormData((cur) => ({
                ...cur,
                price: e.target.value,
              })),
            500
          )}
        />
      </div>
    </>
  );
};

export default Position3;
