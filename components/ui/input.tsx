import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const baseClass =
  "w-full border-b border-border bg-transparent px-0 py-4 text-[15px] leading-[1.5] text-ink outline-none transition-all duration-500 placeholder:text-muted-light/70 focus:border-accent/40";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function TextInput({ label, error, id, className = "", ...rest }: TextInputProps) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
          {label}
        </label>
      )}
      <input id={id} className={`${baseClass} ${className}`} {...rest} />
      {error && <p className="mt-1.5 text-[12px] text-accent">{error}</p>}
    </div>
  );
}

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export function TextArea({ label, error, id, className = "", ...rest }: TextAreaProps) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
          {label}
        </label>
      )}
      <textarea id={id} className={`${baseClass} resize-y ${className}`} {...rest} />
      {error && <p className="mt-1.5 text-[12px] text-accent">{error}</p>}
    </div>
  );
}

type SelectProps = InputHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  children: React.ReactNode;
};

export function Select({ label, id, className = "", children, ...rest }: SelectProps) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`${baseClass} cursor-pointer appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="%236e6e6a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>')] bg-[position:right_0px_center] bg-no-repeat pr-6 ${className}`}
        {...(rest as React.SelectHTMLAttributes<HTMLSelectElement>)}
      >
        {children}
      </select>
    </div>
  );
}
