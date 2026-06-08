"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface DeleteConfirmProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onConfirm: () => void;
  isLogout?: boolean;
}

export const DeleteConfirm = ({
  open,
  onClose,
  title,
  description,
  onConfirm,
  isLogout = false,
}: DeleteConfirmProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Button size={"sm"} variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button size={"sm"} variant="destructive" onClick={onConfirm}>
            {isLogout ? "Logout" : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
