import { FieldValues, Path, useFormContext } from "react-hook-form";
import { Label } from "./ui/label";
import InputError from "./InputError";
import { capitalizeFirstLetter } from "@/utils/helperFunctions";
import { Textarea } from "./ui/textarea";

type FormTextArea<TFormSchema> = {
  field: Path<TFormSchema>; // Field must be a key of the form schema
};

function FormTextArea<TFormSchema extends FieldValues>({
  field,
}: FormTextArea<TFormSchema>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<TFormSchema>();

  return (
    <div className="flex flex-col gap-2 tracking-wide">
      <Label className="capitalize text-foreground" htmlFor={field}>
        {field}
      </Label>
      <Textarea
        id={field}
        {...register(field, {
          required: `${capitalizeFirstLetter(field)} is required`,
        })}
        className="text-foreground"
      />
      {errors[field] && <InputError error={errors[field].message as string} />}
    </div>
  );
}

export default FormTextArea;
