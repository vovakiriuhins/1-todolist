import React, {FC} from 'react';
import {FilterValuesType} from "./App";


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number)=> void
    changeTodoListFilter: (filter: FilterValuesType) => void
}

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const TodoList: FC<TodoListPropsType> = (props) => {

    let isAllTasksNotIsDone = true // все не выполенные
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone) {
            isAllTasksNotIsDone = false
            break;
        }
    }

    const todoClasses = isAllTasksNotIsDone ? "todolist-empty" : "todolist"


const todoListItems = props.tasks.map((task, index) => {
    return (
            <li key={index}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={()=>{props.removeTask(task.id)}}>x</button>
            </li>
    )
})


    return (
        <div className={todoClasses}>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {todoListItems}
            </ul>
            <div>
                <button onClick={()=>{props.changeTodoListFilter("All")}}>All</button>
                <button onClick={()=>{props.changeTodoListFilter("Active")}}>Active</button>
                <button onClick={()=>{props.changeTodoListFilter("Completed")}}>Completed</button>
            </div>
        </div>
    );
};
