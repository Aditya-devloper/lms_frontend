"use client";

import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import moment from "moment";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value?: Date | null;
  minDate?: Date | null;
  onChange?: (date: Date | undefined) => void;
  disabled?: boolean;
}

export function DatePicker({
  value,
  minDate,
  onChange,
  disabled,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />

          {value ? (
            moment(value).format("DD MMM, YYYY")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value ?? undefined}
          required
          disabled={(date) => (minDate ? date < minDate : false)}
          onSelect={(date) => {
            onChange?.(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
