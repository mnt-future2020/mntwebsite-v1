"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const field =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";
const labelCls = "mb-1.5 block text-xs font-medium text-slatey";

// The form state stores dates as "yyyy-mm-dd" strings; react-datepicker works
// with Date objects. Convert using local date parts (not toISOString, which is
// UTC and can shift the day by one in some timezones).
function toDate(s?: string | null): Date | null {
  if (!s) return null;
  const [y, m, d] = String(s).split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}
function toStr(date: Date | null): string {
  if (!date) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function DateField({
  label,
  value,
  onChange,
  minDate,
  maxDate,
  placeholder = "Select date",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
}) {
  const min = minDate ?? new Date(1950, 0, 1);
  const max = maxDate ?? new Date(new Date().getFullYear() + 10, 11, 31);

  return (
    <div>
      <label className={labelCls}>{label}</label>
      <DatePicker
        selected={toDate(value)}
        onChange={(date: Date | null) => onChange(toStr(date))}
        dateFormat="dd MMM yyyy"
        placeholderText={placeholder}
        minDate={min}
        maxDate={max}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        showIcon
        toggleCalendarOnIconClick
        isClearable
        className={field}
        wrapperClassName="block w-full"
        popperClassName="z-50"
      />
    </div>
  );
}
