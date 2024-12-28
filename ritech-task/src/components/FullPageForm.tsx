
import { SubmitHandler, FormProvider, UseFormReturn, FieldValues } from "react-hook-form";
import { ReactNode } from "react";


type FullPageFormProps<TFormSchema extends FieldValues> = {
  onSubmit: SubmitHandler<TFormSchema>;
  methods: UseFormReturn<TFormSchema>;
  children: ReactNode;
};

function FullPageForm<TFormSchema extends FieldValues>({ onSubmit, children, methods }: FullPageFormProps<TFormSchema>) {
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 font-primary"
      >
        {children}
      </form>
    </FormProvider>
  );
}

export default FullPageForm;
