import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}

import { useEffect } from "react";

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.pointerEvents = "auto";
    } else {
      document.body.style.pointerEvents = "auto";
    }

    return () => {
      document.body.style.pointerEvents = "auto";
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle
          className={`text-center font-primary text-foreground ${description ? "-mb-2" : "pb-6"} text-2xl tracking-normal`}
        >
          {title}
        </DialogTitle>
        {description && (
          <DialogDescription className="pb-6 text-center font-primary text-foreground">
            {description}
          </DialogDescription>
        )}

        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
