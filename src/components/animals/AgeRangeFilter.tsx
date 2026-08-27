"use client";

import { CalendarBlank } from "@phosphor-icons/react/CalendarBlank";
import { useState } from "react";

interface AgeRangeFilterProps {
  readonly defaultValue: number;
  readonly max: number;
}

function getAgeLabel(value: number): string {
  return `0–${value} yaş`;
}

export function AgeRangeFilter({ defaultValue, max }: AgeRangeFilterProps) {
  const [age, setAge] = useState(defaultValue);
  const ageLabel = getAgeLabel(age);

  return (
    <div className="form-field adoption-filter-field adoption-filter-field--age">
      <label htmlFor="age">Yaş aralığı</label>
      <div className="adoption-age-control">
        <CalendarBlank aria-hidden="true" size={18} />
        <input
          aria-valuetext={ageLabel}
          id="age"
          max={max}
          min={0}
          name="yas"
          onChange={(event) => setAge(Number(event.currentTarget.value))}
          step={1}
          type="range"
          value={age}
        />
        <output htmlFor="age">{ageLabel}</output>
      </div>
    </div>
  );
}
