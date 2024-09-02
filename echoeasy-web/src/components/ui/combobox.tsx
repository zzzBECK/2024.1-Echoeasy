import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface ComboboxDemoProps {
  options: { _id: string; title: string }[];
  selectedOptions: string[];
  onToggle: (optionId: string, isSelected: boolean) => void;
}

export function MultiCombobox({
  options,
  selectedOptions,
  onToggle,
}: ComboboxDemoProps) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredOptions = options.filter((option) =>
    option.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedOptions.length > 0
            ? `${selectedOptions.length} categoria(s)`
            : "Selecione uma categoria..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Buscar categoria..."
            value={searchTerm}
            onValueChange={(value) => setSearchTerm(value)}
          />
          <CommandList>
            {filteredOptions.length === 0 ? (
              <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>
            ) : (
              <CommandGroup>
                {filteredOptions.map((option) => {
                  const isSelected = selectedOptions.includes(option._id);
                  return (
                    <CommandItem
                      className="cursor-pointer"
                      key={option._id}
                      value={option.title}
                      onSelect={() => onToggle(option._id, isSelected)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option.title}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
