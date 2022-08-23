import {configureStore, createAsyncThunk, createSlice} from "@reduxjs/toolkit";

/**
 * The initial state of our store when the app loads
 * Usually, you would fetch this from a server. Let`s not worry about that now
 */
const defaultTasks = [
	{ id: '1', title: 'Something', state: 'TASK_INBOX' },
	{ id: '2', title: 'Something more', state: 'TASK_INBOX' },
	{ id: '3', title: 'Something else', state: 'TASK_INBOX' },
	{ id: '4', title: 'Something again', state: 'TASK_INBOX' },
]
const TaskBoxData = {
	tasks : defaultTasks,
	status: 'idle',
	error: null
}

/**
 * Create an asyncThunk to fetch tasks from a remote endpoint.
 */
export const fetchTasks = createAsyncThunk(`todos/fetchTodos`, async () => {
	const response = await fetch(
		'https://jsonplaceholder.typicode.com/todos?userId=1'
	)
	const data = await response.json()
	return data.map(task => ({
		id: `${task.id}`,
		title: task.title,
		state: task.completed ? 'TASK_ARCHIVED' : 'TASK_INBOX',
	}))
})

/**
 * The store is created here.
 */
const TaskSlice = createSlice({
	name: 'taskbox',
	initialState: TaskBoxData,
	reducers: {
		updateTaskState: (state, action) => {
			const {id, newTaskState} = action.payload
			const task = state.tasks.findIndex(task => task.id === id)
			if(task >= 0){
				state.tasks[task].state = newTaskState
			}
		}
	},

	/**
	 * @param builder
	 * Extends the reducer for the async actions
	 */
	extraReducers(builder) {
		   builder
		   .addCase(fetchTasks.pending, (state) => {
			     state.status = 'loading';
			     state.error = null;
			     state.tasks = [];
			   })
		   .addCase(fetchTasks.fulfilled, (state, action) => {
			     state.status = 'succeeded';
			     state.error = null;
			     // Add any fetched tasks to the array
				     state.tasks = action.payload;
			    })
		   .addCase(fetchTasks.rejected, (state) => {
			     state.status = 'failed';
			     state.error = "Something went wrong";
			     state.tasks = [];
			   });
	}
})

export const {updateTaskState} = TaskSlice.actions

/**
 * Our app`s store configuration goes here.
 */
const store = configureStore({
	reducer : {
		taskbox: TaskSlice.reducer
	}
})

export default store
