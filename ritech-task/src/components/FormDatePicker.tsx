import { FieldValues, Path, useFormContext, Controller } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Label } from "./ui/label";
import InputError from "./InputError";
import { format } from "date-fns";
import { Button } from "./ui/button"; // For trigger styling
import { capitalizeFirstLetter } from "@/utils/helperFunctions";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { cn } from "@/lib/utils";

type FormDatePicker<TFormSchema> = {
  field: Path<TFormSchema>; // Field must be a key of the form schema
  customLabelText?: string;
};

function FormDatePicker<TFormSchema extends FieldValues>({
  field,
  customLabelText,
}: FormDatePicker<TFormSchema>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<TFormSchema>();

  return (
    <div className="flex flex-col gap-2 tracking-wide">
      {/* Label */}
      <Label className="capitalize text-foreground" htmlFor={field}>
        {capitalizeFirstLetter(customLabelText ? customLabelText : field)}
      </Label>

      {/* Controller for managing the field value */}
      <Controller
        name={field}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "flex items-center justify-start text-left font-normal",
                  !value && "text-foreground",
                )}
              >
                <FaRegCalendarCheck className="mr-2 text-foreground" />
                {value ? (
                  <span className="text-foreground">{format(new Date(value), "PPP")}</span>
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="pointer-events-auto z-50 w-auto p-0 text-foreground"
            >
              <Calendar
                mode="single"
                selected={value ? new Date(value) : undefined}
                onSelect={(date) => {
                  onChange(date ? date.toISOString() : "");
                }}
              />
            </PopoverContent>
          </Popover>
        )}
      />
      {errors[field] && <InputError error={errors[field].message as string} />}
    </div>
  );
}

export default FormDatePicker;
