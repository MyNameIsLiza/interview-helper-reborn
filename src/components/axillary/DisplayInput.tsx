import clsx from 'clsx';
import React, { useCallback, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

interface DisplayInputProperties {
  type?: string;
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  wrapClassName?: string;
  isLoading?: boolean;
}

export default function DisplayInput({
  type,
  value,
  onChange,
  wrapClassName,
  className,
  isLoading,
}: DisplayInputProperties): React.ReactElement {
  const [isEdit, setIsEdit] = useState(false);
  const reference = useRef<HTMLDivElement>(null);
  const [currentValue, setCurrentValue] = useState(value ?? '');

  const finishEdit = useCallback(() => {
    if (isEdit) {
      if (currentValue !== value) {
        onChange(currentValue);
      }
      setIsEdit(false);
    }
  }, [isEdit, currentValue]);

  useOnClickOutside(reference, () => {
    finishEdit();
  });

  return (
    <div ref={reference} className={clsx('p-2 cursor-pencil', wrapClassName)}>
      {isLoading ? (
        <div className="border border-white cursor-progress p-1">
          Loading...
        </div>
      ) : isEdit ? (
        <input
          onKeyDown={(event): void => {
            if (event.key === 'Enter') {
              finishEdit();
            }
          }}
          className={clsx(
            'border border-slate rounded focus:outline-none p-1',
            className,
          )}
          type={type}
          defaultValue={value}
          onChange={(event): void => {
            setCurrentValue(event.target.value);
          }}
        />
      ) : (
        <div /*contentEditable={true}*/
             className="border border-white p-1"
          onDoubleClick={(): void => {
            setIsEdit(true);
          }}
        >
          {value}
        </div>
      )}
    </div>
  );
}

DisplayInput.defaultProps = {
  type: 'text',
  value: '',
  isLoading: false,
  className: '',
  wrapClassName: '',
};
