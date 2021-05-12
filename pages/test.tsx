import { useSelect } from "react-select-search/dist/cjs";

export default function Example() {
  const options = [
    { name: "Swedish", value: "sv" },
    { name: "English", value: "en" },
    {
      type: "group",
      name: "Group name",
      items: [{ name: "Spanish", value: "es" }],
    },
  ];

  const [snapshot, valueProps, optionProps] = useSelect({
    options,
    value: "sv",
    search: true,
  });

  return (
    <div>
      <button {...valueProps}>{snapshot.displayValue}</button>
      
      {snapshot.focus && (
        <ul>
          {snapshot.options.map((option) => (
            <li key={option.value}>
              <button {...optionProps} value={option.value}>
                {option.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
