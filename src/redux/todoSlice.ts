import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "../models/todo";

const initialState = [] as Todo[];

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: {
            reducer: (state, action: PayloadAction<Todo>) => {
                state.push(action.payload);
            },
            prepare: (description: string) => ({
                payload: {
                    id: uuidv4(),
                    description,
                    completed: false,
                    isEditing: false,
                } as Todo,
            })
        },
        removeTodo(state, action: PayloadAction<string>) {
            const index = state.findIndex((todo) => todo.id === action.payload);
            state.splice(index, 1);
        },
        setTodoStatus(state, action: PayloadAction<{id: string, completed: boolean}>) {
            const index = state.findIndex((todo) => todo.id === action.payload.id);
            state[index].completed = action.payload.completed;
        },
        editTodo(state, action: PayloadAction<string>) {
          const index = state.findIndex((todo) => todo.id === action.payload);
          for (let i = 0; i < state.length; i++) {
            state[i].isEditing = false;
          }
          state[index].isEditing = true;
        },
        updateTodo(state, action: PayloadAction<{id: string, description: string}>) {
          const index = state.findIndex((todo) => todo.id === action.payload.id);
          state[index].isEditing = false;
          state[index].description = action.payload.description;
        }
    }
});

export const { addTodo, removeTodo, setTodoStatus, editTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;