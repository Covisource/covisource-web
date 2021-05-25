import Input from "~components/Input";

const Position4 = ({ formData, setFormData, errs }) => {
  return (
    <div className="mt-5 flex flex-col gap-2">
      {formData.positionFour.extraParameters?.map((param) => {
        const indexInFormData = formData.positionFour.extraParameters.findIndex(
          (formParam) => formParam.name === param.name
        );

        return (
          <>
            <Input
              type={param.type}
              heading={param.name}
              placeholder={`Enter ${param.name}`}
              className={`ct-bg-muted p-3 rounded-lg ${
                Object.keys(errs.positionFour || {}).includes(param.name) &&
                "border border-red-500 shadow-md"
              }`}
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
            <ErrorText text={errs.positionFour[param.name]} />
          </>
        );
      })}
    </div>
  );
};

const ErrorText = ({ text }) => {
  if (text) {
    return (
      <span className="text-red-500 text-sm font-bold flex items-center gap-2 ml-1">
        <i className="fas fa-exclamation-triangle"></i>
        {text || ""}
      </span>
    );
  }
  return <></>;
};

export default Position4;
