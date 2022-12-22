import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const getTodosAsync= createAsyncThunk('todos/getTodosAsync', async () =>{
  const res = await fetch('http://localhost:7000/todos');
  return await res.json();
} )

export const addTodoAsync=createAsyncThunk('todos/addTodoAsync', async(data) =>{
  const res= await axios.post('http://localhost:7000/todos',data)
  return res.data;
})



export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter:"all",
    addNewTodoError:null
  },
  reducers: {
    // addTodo: (state, action) => {
    //   state.items.push(action.payload);
    // },
    toggle: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find((item) => item.id === id);
      item.completed = !item.completed;
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      const filtered = state.items.filter((item) => item.id !== id);
      state.items = filtered;
    },
    changeActiveFilter: (state,action) =>{
      state.activeFilter = action.payload;
    },
    clearCompleted:(state) => {
      const filtered = state.items.filter((item)=>item.completed == false);
      state.items = filtered ; 
    }
    
  },
  extraReducers: {
    //get todos
    [getTodosAsync.pending]: (state,action) => {
      state.isLoading =true;
    },
    [getTodosAsync.fulfilled] : (state,action) =>{
      state.items= action.payload;
      state.isLoading=false;
    },
    [getTodosAsync.rejected]: (state, action) =>{
      state.isLoading=false;
      state.error = action.error.message;
    },
    // add todos
    [addTodoAsync.fulfilled]:(state,action) =>{
        state.items.push(action.payload);
    },
    [addTodoAsync.rejected]:(state,action) =>{
      state.addNewTodoError = action.error.message;
    }
  }
});

export const { toggle, deleteTodo,changeActiveFilter,clearCompleted} = todosSlice.actions;
export default todosSlice.reducer;
