import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

/* ── Shared input styling ── */
const baseClass =
  "w-full border border-border bg-transparent px-4 py-3.5 text-[14px] leading-[1.5] text-ink outline-none transition-all duration-300 placeholder:text-muted-light focus:border-ink focus:ring-1 focus:ring-ink/5";

/* ── TextInput ── */
type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function TextInput({ label, error, id, className = "", ...rest }: TextInputProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-[13px] font-medium text-ink/70"
        >
          {label}
        </label>
      )}
      <input id={id} className={`${baseClass} ${className}`} {...rest} />
      {error && <p className="mt-1.5 text-[12px] text-accent">{error}</p>}
    </div>
  );
}

/* ── TextArea ── */
type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export function TextArea({ label, error, id, className = "", ...rest }: TextAreaProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-[13px] font-medium text-ink/70"
        >
          {label}
        </label>
      )}
      <textarea id={id} className={`${baseClass} resize-y ${className}`} {...rest} />
      {error && <p className="mt-1.5 text-[12px] text-accent">{error}</p>}
    </div>
  );
}

/* ── Select ── */
type SelectProps = InputHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  children: React.ReactNode;
};

export function Select({ label, id, className = "", children, ...rest }: SelectProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-[13px] font-medium text-ink/70"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        className={`${baseClass} cursor-pointer appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="%236e6e6a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>')] bg-[position:right_12px_center] bg-no-repeat pr-10 ${className}`}
        {...(rest as React.SelectHTMLAttributes<HTMLSelectElement>)}
      >
        {children}
      </select>
    </div>
  );
}
