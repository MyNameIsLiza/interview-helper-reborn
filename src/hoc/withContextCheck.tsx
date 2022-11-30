import type { Context, FC } from 'react';
import { useContext } from 'react';

export default function withContextCheck<
  T1 extends Record<string, unknown>,
  T2,
>(WrappedComponent: FC<T1>, context: Context<T2>): FC<T1> {
  function WithContextCheck(properties: T1): React.ReactElement | null {
    const contextValue = useContext(context);
    if (!contextValue) {
      return null;
    }
    return <WrappedComponent {...properties} />;
  }

  WithContextCheck.displayName = `withContextCheck(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;
  return WithContextCheck;
}
