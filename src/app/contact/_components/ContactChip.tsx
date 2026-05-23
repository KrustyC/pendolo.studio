import { classNames } from "@/lib/utils/classNames";

import { SelectionCircle } from "./SelectionCircle";

interface ContactChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export const ContactChip: React.FC<ContactChipProps> = ({
  label,
  selected,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative inline-flex items-center justify-center bg-transparent px-2 py-1 text-white/60 transition-colors duration-150 hover:text-white"
      aria-pressed={selected}
    >
      {selected ? (
        <SelectionCircle className="pointer-events-none absolute -inset-x-2 -inset-y-1 h-[calc(100%+0.5rem)] w-[calc(100%+1rem)] max-w-none" />
      ) : null}

      <span
        className={classNames(
          "relative z-10 font-light tracking-tight leading-[1.05] transition-colors duration-150",
          {
            "text-white": selected,
          }
        )}
      >
        {label}
      </span>
    </button>
  );
};
