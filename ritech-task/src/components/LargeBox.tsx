import { ReactNode } from "react";

type LargeBoxProps = {
  title: string;
  children: ReactNode;
  className?: string
};

function LargeBox({ title, children, className }: LargeBoxProps) {
  return (
    <div className="h-full w-full rounded-lg bg-background px-10 py-8 shadow-custom">
      <h2 className="mb-6 font-primary text-xl font-bold">{title}</h2>
      <div className={`scrollbar-hidden max-h-96 overflow-x-hidden ${className}`}>
        {children}
      </div>
    </div>
  );
}

export default LargeBox;
