import React from "react";
import Task from "./Task";


/**
 * 우리가 문서화하고 있는 컴포너트에 대해 알려주기
 */
export default {
	/**
	 * 해당 컴포넌트
	 */
	component : Task,

	/**
	 * 스토리북 앱의 사이드바에서 컴포넌트를 참조하는 방법
	 */
	title : 'Task'
}

const Template = args => <Task {...args} />

export const Default = Template.bind({})
Default.args = {
	task : {
		id: '1',
		title : 'Test Task',
		state : 'TASK_INBOX',
		updateAt: new Date(2021, 0 ,1, 9, 0)
	}
}

export const Pinned = Template.bind({})
Pinned.args = {
	task:{
		...Default.args.task,
		state : 'TASK_PINNED',
	}
}

export const Archived = Template.bind({})
Archived.args = {
	task : {
		...Default.args.task,
		state : 'TASK_ARCHIVED'
	}
}
