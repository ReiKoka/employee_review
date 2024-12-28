import FormField from "@/components/FormInput";
import FullPageForm from "@/components/FullPageForm";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/useLogin";
import { LoginType } from "@/utils/types";
import { SubmitHandler, useForm } from "react-hook-form";

function LoginPage() {
  const { login } = useLogin();
  const methods = useForm<LoginType>(); // create form instance here

  const onSubmit: SubmitHandler<LoginType> = (data) => {
    console.log(data);
    login(data);
    methods.reset();
  };

  return (
    <div className="grid h-dvh w-full place-items-center bg-muted">
      <div className="flex w-[400px] flex-col gap-8 rounded-lg border-2 border-muted bg-card px-16 py-10 shadow-lg">
        <h3 className="text-center font-primary text-2xl text-foreground font-bold tracking-wider">
          Login
        </h3>
        <FullPageForm methods={methods} onSubmit={onSubmit}>
          <FormField field="email" />
          <FormField field="password" />
          <div className="flex justify-end gap-4">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit" variant="default">
              Confirm
            </Button>
          </div>
        </FullPageForm>
      </div>
    </div>
  );
}

export default LoginPage;
