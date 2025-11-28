import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";

import { Button } from "@workspace/ui/components/button";
import { Check } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface Props {
  name: string;
  label: string;
  trigger: string; // text on the button when nothing is selected
  options: Option[];
  disabled?: boolean;
}

export default function FormDropdownMenu({
  label,
  trigger,
  name,
  options,
  disabled = false,
}: Props) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        // Make sure value is always an array for multi-select
        const selectedValues: string[] = Array.isArray(field.value)
          ? field.value
          : field.value
            ? [field.value]
            : [];

        const selectedCount = selectedValues.length;

        // What to show on the button
        const buttonLabel =
          selectedCount === 0 ? trigger : `${selectedCount} selected`;

        return (
          <FormItem className="py-2 w-xs">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    type="button"
                    disabled={disabled}
                    className="w-full justify-between"
                  >
                    {buttonLabel}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56" align="start">
                  {options.map((opt) => {
                    const isSelected = selectedValues.includes(opt.value);

                    return (
                      <DropdownMenuItem
                        key={opt.value}
                        // IMPORTANT: prevent closing the menu on each click
                        onSelect={(e) => {
                          e.preventDefault();

                          let next: string[];

                          if (isSelected) {
                            // remove from selection
                            next = selectedValues.filter(
                              (val) => val !== opt.value
                            );
                          } else {
                            // add to selection
                            next = [...selectedValues, opt.value];
                          }

                          field.onChange(next);
                        }}
                      >
                        {isSelected ? <Check className="text-green-500" /> : ""}{" "}
                        {opt.label}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
