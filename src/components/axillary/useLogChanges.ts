import { useEffect } from 'react';

export default function useLogChanges(
  where: string,
  what: string,
  value: unknown,
): void {
  useEffect(() => {
    console.debug(where, what, value);
  }, [where, what, value]);
}
