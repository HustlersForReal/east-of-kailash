'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export type DropdownOption = { value: string; label: string };
export type DropdownGroup = { group: string; options: DropdownOption[] };

type BaseProps = {
  id: string;
  options: DropdownOption[] | DropdownGroup[];
  placeholder?: string;
  className?: string;
  /**
   * `dark` is for the navy form panels (buyer / seller forms).
   * `light` is for white cards such as the calculators.
   */
  variant?: 'dark' | 'light';
};

type SingleMode = {
  multiple?: false;
  value: string;
  onChange: (value: string) => void;
};

type MultiMode = {
  multiple: true;
  value: string[];
  onChange: (value: string[]) => void;
};

type DropdownProps = BaseProps & (SingleMode | MultiMode);

function isGrouped(
  options: DropdownOption[] | DropdownGroup[]
): options is DropdownGroup[] {
  return options.length > 0 && 'options' in options[0];
}

/**
 * Custom listbox styled to match the dark navy form panel. Native <select>
 * renders a black arrow on dark backgrounds and cannot show a chevron,
 * optgroup styling, or multi-select, so we drive the list ourselves.
 */
export function Dropdown(props: DropdownProps) {
  const {
    id,
    options,
    placeholder = 'Select',
    className = '',
    multiple = false,
    variant = 'dark',
  } = props;

  // Normalise both modes to a list of selected values.
  const selected: string[] = props.multiple
    ? props.value
    : props.value
      ? [props.value]
      : [];

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Flatten to a single list so keyboard nav and selection are simple.
  const flat: DropdownOption[] = isGrouped(options)
    ? options.flatMap((g) => g.options)
    : options;

  const isSelected = (v: string) => selected.includes(v);

  const triggerLabel = (() => {
    if (selected.length === 0) return null;
    if (!props.multiple) {
      return flat.find((o) => o.value === selected[0])?.label ?? null;
    }
    if (selected.length === 1) {
      return flat.find((o) => o.value === selected[0])?.label ?? null;
    }
    return `${selected.length} selected`;
  })();

  useEffect(() => {
    if (!open) return;
    const onDocDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Keep the highlighted row inside the scroll area.
  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>('[data-active="true"]');
    el?.scrollIntoView({ block: 'nearest' });
  }, [open, activeIndex]);

  // Seed the highlighted row when the menu opens, rather than syncing it
  // from an effect: `flat` is rebuilt every render, so an effect here would
  // reset the highlight on each render and fight arrow-key navigation.
  const openMenu = () => {
    const idx = flat.findIndex((o) => o.value === selected[0]);
    setActiveIndex(idx >= 0 ? idx : 0);
    setOpen(true);
  };

  const pick = (v: string) => {
    if (props.multiple) {
      // Stay open so several options can be ticked in one pass.
      props.onChange(
        selected.includes(v) ? selected.filter((x) => x !== v) : [...selected, v]
      );
      return;
    }
    props.onChange(v);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      openMenu();
      return;
    }
    if (!open) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flat.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const opt = flat[activeIndex];
      if (opt) pick(opt.value);
    }
  };

  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        id={id}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        className={`w-full flex items-center justify-between gap-2 border rounded-lg px-3.5 py-2.5 text-sm text-left outline-none transition-colors ${
          variant === 'light'
            ? `bg-white border-border-color hover:border-gold-accent/40 focus:border-gold-accent ${
                triggerLabel ? 'text-primary-navy' : 'text-secondary-text/50'
              }`
            : `bg-white/5 border-white/15 hover:border-white/25 focus:border-gold-accent ${
                triggerLabel ? 'text-white' : 'text-light-navy/40'
              }`
        } ${className}`}
      >
        <span className="truncate">{triggerLabel ?? placeholder}</span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 text-gold-accent transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-[60] bg-primary-navy border border-white/15 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
          <div
            id={`${id}-list`}
            role="listbox"
            aria-multiselectable={multiple || undefined}
            ref={listRef}
            className="max-h-60 overflow-y-auto overscroll-contain py-1"
          >
            {isGrouped(options)
              ? options.map((group) => (
                  <div key={group.group}>
                    <p className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-widest text-light-navy/40">
                      {group.group}
                    </p>
                    {group.options.map((o) => {
                      const idx = flat.indexOf(o);
                      return (
                        <OptionRow
                          key={o.value}
                          option={o}
                          selected={isSelected(o.value)}
                          active={idx === activeIndex}
                          onHover={() => setActiveIndex(idx)}
                          onPick={() => pick(o.value)}
                        />
                      );
                    })}
                  </div>
                ))
              : flat.map((o, idx) => (
                  <OptionRow
                    key={o.value}
                    option={o}
                    selected={isSelected(o.value)}
                    active={idx === activeIndex}
                    onHover={() => setActiveIndex(idx)}
                    onPick={() => pick(o.value)}
                  />
                ))}
          </div>

          {props.multiple && (
            <div className="border-t border-white/10 px-3 py-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-full text-center text-xs font-semibold text-gold-accent hover:underline"
              >
                Done{selected.length > 0 ? ` (${selected.length} selected)` : ''}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function OptionRow({
  option,
  selected,
  active,
  onHover,
  onPick,
}: {
  option: DropdownOption;
  selected: boolean;
  active: boolean;
  onHover: () => void;
  onPick: () => void;
}) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      data-active={active}
      onMouseEnter={onHover}
      onClick={onPick}
      className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-left text-sm transition-colors ${
        active ? 'bg-white/10' : ''
      } ${selected ? 'text-gold-accent font-semibold' : 'text-light-navy/85'}`}
    >
      <span className="truncate">{option.label}</span>
      {selected && <Check className="w-3.5 h-3.5 shrink-0" />}
    </button>
  );
}
