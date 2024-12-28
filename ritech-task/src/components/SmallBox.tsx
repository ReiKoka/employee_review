import { IconType } from "react-icons/lib";

type SmallBoxProps = {
  icon: IconType;
  text: string;
  value: number;
};

function SmallBox({ icon: Icon, text, value }: SmallBoxProps) {
  return (
    <div className="grid grid-cols-[4rem_1fr] grid-rows-2 gap-2 rounded-lg bg-card p-4 shadow-custom">
      <div className="row-span-2 flex h-full w-full items-center justify-center rounded-full bg-purple-100 dark:opacity-90 p-4">
        <Icon className="h-full w-full text-primary" />
      </div>
      <div className="row-span-2 flex flex-col p-2">
        <p className="font-primary text-sm font-bold tracking-wide text-card-foreground">
          {text}
        </p>
        <h3 className="font-primary text-2xl font-bold text-card-foreground">{value}</h3>
      </div>
    </div>
  );
}

export default SmallBox;
