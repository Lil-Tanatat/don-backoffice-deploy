import * as React from "react";
import Select, { MultiValue } from "react-select";
import { cn } from "@/lib/utils";

interface OptionType {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

function MultiSelect({
  options,
  value,
  onChange,
  placeholder,
  className,
}: MultiSelectProps) {
  // Convert string array to react-select format
  const selectOptions: OptionType[] = options.map((option) => ({
    value: option,
    label: option,
  }));

  // Convert current value to react-select format
  const selectValue: OptionType[] = value.map((val) => ({
    value: val,
    label: val,
  }));

  const handleChange = (selectedOptions: MultiValue<OptionType>) => {
    const newValue = selectedOptions
      ? selectedOptions.map((option: OptionType) => option.value)
      : [];
    onChange(newValue);
  };

  return (
    <div className={cn("", className)}>
      <Select
        className="bg-white"
        isMulti
        options={selectOptions}
        value={selectValue}
        onChange={handleChange}
        placeholder={placeholder}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        classNames={{
          control: (state) =>
            cn(
              "!border-input !bg-transparent !min-h-9 !h-9 !shadow-xs !transition-[color,box-shadow] !outline-none",
              state.isFocused &&
                "!border-ring !ring-ring/50 !ring-[3px] !shadow-none",
              className?.includes("border-destructive") &&
                "!border-destructive !ring-destructive/20"
            ),
          valueContainer: () => "!p-1 !px-3",
          input: () => "!text-base md:!text-sm !p-0 !m-0",
          indicatorSeparator: () => "!bg-border",
          dropdownIndicator: () => "!text-muted-foreground !p-1",
          clearIndicator: () => "!text-muted-foreground !p-1",
          multiValue: () => " !text-secondary-foreground !rounded-sm !m-0.5",
          multiValueLabel: () => "!text-sm !px-1.5 !py-0.5",
          multiValueRemove: () =>
            "!text-secondary-foreground hover:!bg-destructive hover:!text-destructive-foreground !rounded-r-sm !px-1",
          menu: () =>
            "!bg-white !border !border-input !rounded-md !shadow-lg !mt-1 !z-50",
          option: (state) =>
            cn(
              "!text-sm !px-3 !py-2 !cursor-pointer !transition-colors",
              state.isFocused && "!bg-accent",
              state.isSelected && "!bg-primary !text-primary-foreground"
            ),
          placeholder: () => "!text-muted-foreground !text-base md:!text-sm",
        }}
        styles={{
          control: (base) => ({
            ...base,
            border: "none",
            boxShadow: "none",
            "&:hover": {
              border: "none",
            },
          }),
        }}
      />
    </div>
  );
}

export { MultiSelect };
