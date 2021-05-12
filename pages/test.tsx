import { useSelect } from "react-select-search/dist/cjs";
import Input from "~components/Form/Input";

export default function Example() {
  const options = [
    { title: "Mumbai", address: "abc 123 street i guess lol" },
    { title: "Hydi", address: "abc 123 street i guess lol" },
    { title: "Udaipur", address: "abc 123 street i guess lol" },
    { title: "Vasia", address: "abc 123 street i guess lol" },
  ];

  const [snapshot, valueProps, optionProps] = useSelect({
    options,
    value: "sv",
    search: true,
  });

  console.log(valueProps);

  return (
    <div>
      <Input
        placeholder="Enter a location"
        className="border-r border-gray-400 ct-location_search"
        subClassName="text-sm text-gray-900 font-medium rounded-r-none placeholder-gray-900"
        id="navbarLocationSearch"
        append={<i className="fas fa-caret-down ct-text-color"></i>}
        {...valueProps}
      />

      {snapshot.focus &&
        snapshot.options.map((option) => (
          <div className="flex flex-col justify-center gap-1 py-4 px-3 border-b border-gray-300 text-gray-200 select-none hover:bg-gray-300 cursor-pointer">
            <span className="truncate">{option.title}</span>
            <span className="truncate text-xs text-gray-200">
              {option.address}
            </span>
          </div>
        ))}
    </div>
  );
}
