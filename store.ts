import { create } from "zustand"
import { devtools, persist } from 'zustand/middleware'

// Standard interface and functions
export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export const update_todo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
  }));

export const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

export const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);

export const add_todo = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text,
    done: false,
  },
];

// Zustand implementation
interface Store {
  todos: Todo[],
  newTodo: string,
  addTodo: () => void,
  setNewTodo: (text: string) => void,
  update: (id: number, text: string) => void
  toggle: (id: number) => void,
  remove: (id: number) => void,
  load: (todos: Todo[]) => void
}

// const useStore = create<Store>((set) => ({
//   todos: [],
//   newTodo: "",
//   addTodo: () =>
//       set((state) => ({
//         ...state,
//         todos: addTodo(state.todos, state.newTodo),
//         newTodo: "",
//       })),
//   setNewTodo(text: string) {
//     set(state => ({
//       ...state,
//       newTodo: text
//     }))
//   }
// }))

const useStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        todos: [],
        newTodo: "",
        addTodo: () => set((state: Store) => (
          {
            todos: add_todo(state.todos, state.newTodo),
            newTodo: "",
          }
        )
        ),
        setNewTodo: (text: string) => set(() => (
          {
            newTodo: text,
          }
        )
        ),
        update: (id: number, text: string) => set((state: Store) => (
          {
            todos: update_todo(state.todos, id, text)
          }
        )),
        toggle: (id: number) => set((state: Store) => (
          {
            todos: toggleTodo(state.todos, id)
          }
        )),
        remove: (id: number) => set((state: Store) => (
          {
            todos: removeTodo(state.todos, id)
          }
        )),
        load: (todos: Todo[]) => set(() => (
          {
            todos
          }
        )),
      }),
      {
        name: 'todo-storage',
      }
    )
  )
)

interface BearState {
  bears: number
  increase: (by: number) => void
}

const useBearStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        bears: 0,
        increase: (by) => set((state: BearState) => ({ bears: state.bears + by })),
      }),
      {
        name: 'bear-storage',
      }
    )
  )
)

export default useStore
