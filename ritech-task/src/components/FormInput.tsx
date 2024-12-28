import { FieldValues, Path, useFormContext } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import InputError from "./InputError";
import { capitalizeFirstLetter } from "@/utils/helperFunctions";

type FormInput<TFormSchema> = {
  field: Path<TFormSchema>;
  defaultValue?: number | string | undefined;
  readOnly?: boolean;
};

function FormInput<TFormSchema extends FieldValues>({
  field,
  defaultValue,
  readOnly = false,
}: FormInput<TFormSchema>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<TFormSchema>();

  return (
    <div className="flex flex-col gap-2 tracking-wide text-foreground">
      <Label className="capitalize" htmlFor={field}>
        {field}
      </Label>
      <Input
        id={field}
        readOnly={readOnly}
        defaultValue={defaultValue}
        {...register(field, {
          required: `${capitalizeFirstLetter(field)} is required`,
        })}
        type={
          field === "password"
            ? "password"
            : field === "email"
              ? "email"
              : "text"
        }
        className="input input-bordered"
      />
      {errors[field] && <InputError error={errors[field].message as string} />}
    </div>
  );
}

export default FormInput;
