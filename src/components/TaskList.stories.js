import TaskList from "./TaskList";
import * as TaskStories from './Task.stories'
import {Provider} from "react-redux";
import {configureStore, createSlice} from "@reduxjs/toolkit";

export const MockedState = {
	tasks: [
		{ ...TaskStories.Default.args.task, id: '1', title: 'Task 1' },
		{ ...TaskStories.Default.args.task, id: '2', title: 'Task 2' },
		{ ...TaskStories.Default.args.task, id: '3', title: 'Task 3' },
		{ ...TaskStories.Default.args.task, id: '4', title: 'Task 4' },
		{ ...TaskStories.Default.args.task, id: '5', title: 'Task 5' },
		{ ...TaskStories.Default.args.task, id: '6', title: 'Task 6' },
	],
	status: 'idle',
	error: null
}

const Mockstore = ({taskBoxState, children}) => (
	<Provider
		store={configureStore({
			reducer: {
				taskbox: createSlice({
					name: 'taskbox',
					initialState: taskBoxState,
					reducers: {
						updateTaskState: (state, action) => {
							const { id, newTaskState } = action.payload;
							const task = state.tasks.findIndex((task) => task.id === id);
							if (task >= 0) {
								state.tasks[task].state = newTaskState;
							}
						},
					},
				}).reducer,
			},
		})}
	>
		{children}
	</Provider>
)

export default {
	component: TaskList,
	title: 'TaskList',
	decorators: [story => <div style={{padding: '3rem'}}>{story()}</div>],
	excludeStories: /.*MockedState$/
}

const Template = () => <TaskList  />

export const Default = Template.bind({})
Default.decorators = [
	story => <Mockstore taskBoxState={MockedState}>{story()}</Mockstore>
]

export const WithPinnedTasks = Template.bind({})
WithPinnedTasks.decorators = [
	story => {
		const pinnedtasks = [
			...MockedState.tasks.slice(0, 5),
			{ id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
		];

		return (
			<Mockstore taskBoxState={{
				...MockedState,
				tasks: pinnedtasks
			}}>
				{story()}
			</Mockstore>
		)
	}
]

export const Loading = Template.bind({})
Loading.decorators = [
	story => (
		<Mockstore
			taskBoxState={{
				...MockedState,
				status: 'loading'
			}}
		>
			{story()}
		</Mockstore>
	)
]

export const Empty = Template.bind({})
Empty.decorators = [
	story => (
		<Mockstore taskBoxState={{...MockedState, tasks: []}}>
			{story()}
		</Mockstore>
	)
]
