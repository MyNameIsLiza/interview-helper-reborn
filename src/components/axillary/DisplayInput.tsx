import React, { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

interface DisplayInputProps {
  type?: string;
  value?: string;
  onChange: (value: string) => void;
}

export default function DisplayInput({
  type = 'text',
  value = '',
  onChange,
}: DisplayInputProps): React.ReactElement {
  const [isEdit, setIsEdit] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState(value);

  useOnClickOutside(ref, () => {
    if (isEdit) {
      onChange(val);
      setIsEdit(false);
    }
  });

  return (
    <div ref={ref}>
      {isEdit ? (
        <input
          type={type}
          defaultValue={value}
          onChange={(e) => setVal(e.target.value)}
        />
      ) : (
        <div onClick={() => setIsEdit(true)}>{value}</div>
      )}
    </div>
  );
}
