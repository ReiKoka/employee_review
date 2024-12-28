import { FieldValues, Path, Controller, useFormContext } from "react-hook-form";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "./ui/select";
import InputError from "./InputError";
import {
  capitalizeFirstLetter,
  getCamelCaseRoot,
} from "@/utils/helperFunctions";

type FormSelectProps<TFormSchema extends FieldValues> = {
  field: Path<TFormSchema>;
  options: { value: string | number; label: string }[];
  placeholder?: string;
};

function FormSelect<TFormSchema extends FieldValues>({
  field,
  options,
  placeholder = "Select an option",
}: FormSelectProps<TFormSchema>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<TFormSchema>();

  return (
    <div className="flex flex-col gap-2 tracking-wide">
      <Label className="capitalize text-foreground" htmlFor={String(field)}>
        {getCamelCaseRoot(field)}
      </Label>
      <Controller
        control={control}
        name={field}
        render={({ field: { onChange, value } }) => (
          <Select
            value={value?.toString() || ""}
            onValueChange={(selectedValue) => {
              onChange(selectedValue); // Update form state
            }}
          >
            <SelectTrigger>
              {!value ? (
                // Render the placeholder with `text-foreground` styling
                <span className="text-foreground">{placeholder}</span>
              ) : (
                // Render the selected value

                <span className="text-foreground">
                  {capitalizeFirstLetter(
                    options.find(
                      (option) => option.value.toString() === value?.toString(),
                    )?.label as string,
                  )}
                </span>
              )}
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value.toString()}
                  className="capitalize text-foreground"
                >
                  {capitalizeFirstLetter(option.label)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {errors[field] && (
        <InputError
          error={(errors[field]?.message as string) || "Invalid selection"}
        />
      )}
    </div>
  );
}

export default FormSelect;
