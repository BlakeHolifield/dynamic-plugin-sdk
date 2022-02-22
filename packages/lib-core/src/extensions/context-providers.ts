import type { Provider } from 'react';
import type { CodeRef, Extension } from '../types/extension';

/** Adds new React context provider to Console application root. */
export type ContextProvider<TValue = unknown> = Extension<
  'core.context-provider',
  {
    /** Context Provider component. */
    provider: CodeRef<Provider<TValue>>;
    /** Hook for the Context value. */
    useValueHook: CodeRef<() => TValue>;
  }
>;

// Type guards

export const isContextProvider = (e: Extension): e is ContextProvider =>
  e.type === 'core.context-provider';
