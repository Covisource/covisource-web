import Input from "~components/Input";

const Position4 = ({ formData, setFormData }) => {
  return (
    <>
      <div className="mt-5 flex flex-col gap-2">
        {formData.positionFour.extraParameters?.map((param) => {
          const indexInFormData =
            formData.positionFour.extraParameters.findIndex(
              (formParam) => formParam.name === param.name
            );

          return (
            <Input
              type={param.type}
              heading={param.name}
              placeholder={`Enter ${param.name}`}
              className="ct-bg-muted p-3 rounded-lg"
              subClassName="ct-text-color-1 text-sm font-medium bg-transparent"
              prepend={<i className={`${param.icon}`}></i>}
              value={
                formData.positionFour.extraParameters[indexInFormData].value
              }
              onChange={(e) => {
                const newPositionFour = { ...formData.positionFour };
                newPositionFour.extraParameters[indexInFormData].value =
                  e.target.value;
                setFormData((cur) => ({
                  ...cur,
                  positionFour: newPositionFour,
                }));
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default Position4;
