import { useDispatch } from 'react-redux';
import {useTodos} from "../shared/hooks/use-todos";
import {renderHook} from "@testing-library/react";

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

const mockDispatch = jest.fn();

beforeEach(() => {
  (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
});

describe('useTodos hook', () => {
  it('should call dispatch when toAddToDo is called', () => {
    const { result } = renderHook(() => useTodos());
    const { toAddToDo } = result.current;

    const todoData = { id: '1', text: 'Test Todo', completed: false };
    toAddToDo(todoData);

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should call dispatch when toToggleTodo is called', () => {
    const { result } = renderHook(() => useTodos());
    const { toToggleTodo } = result.current;

    const todoId = '1';
    toToggleTodo(todoId);

    expect(mockDispatch).toHaveBeenCalled();
  });
});
