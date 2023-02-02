import { renderHook } from '@testing-library/react-hooks/native';
import TestRenderer from 'react-test-renderer';
import { useWorkspace } from './useWorkspace';

const { act } = TestRenderer;

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(() => jest.fn()),
  useSelector: jest.fn(),
}));

const WORKSPACE_KEY = 'sdk/active-workspace';

describe('useWorkspace', () => {
  beforeEach(() => {
    jest.resetModules();
    localStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('an unset workspace should return null', () => {
    const { result } = renderHook(() => useWorkspace());
    const [data, setter] = result.current;

    expect(data).toBeNull();
    expect(setter).toBeDefined();
  });

  test('a set workspace should return the activeWorkspace', () => {
    localStorage.setItem(WORKSPACE_KEY, 'platform-experience');
    const { result } = renderHook(() => useWorkspace());
    const [data, setter] = result.current;

    expect(data).toBe('platform-experience');
    expect(setter).toBeDefined();
  });

  test('updating workspace should return the activeWorkspace', () => {
    localStorage.setItem(WORKSPACE_KEY, 'platform-experience');
    const { result } = renderHook(() => useWorkspace());
    const [data, setter] = result.current;

    expect(data).toBe('platform-experience');

    act(() => {
      setter('openshift');
    });
    expect(localStorage.getItem(WORKSPACE_KEY)).toBe('openshift');
  });

  test('clearing localStorage should return null', () => {
    localStorage.setItem(WORKSPACE_KEY, 'platform-experience');
    const { result } = renderHook(() => useWorkspace());
    const [data, setter] = result.current;

    expect(data).toBe('platform-experience');
    expect(setter).toBeDefined();

    localStorage.clear();

    expect(localStorage.getItem(WORKSPACE_KEY)).toBeNull();
  });
});
