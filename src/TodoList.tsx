import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string)=> void
    changeTodoListFilter: (filter: FilterValuesType) => void
    addTask:(title: string)=>void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList: FC<TodoListPropsType> = (props) => {



const todoListItems = props.tasks.map((task, index) => {
    const removeTaskHandler = () => props.removeTask(task.id);
    return (
            <li key={index}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={removeTaskHandler}>x</button>
            </li>
    )
})

    const [title, setTitle] = useState("")

    const addTaskHandler = ()=> {
        props.addTask(title)
        setTitle("")
    }



    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)


    const maxTitleLength = 20
    const recommendedLength = 10
    const isAddTaskNotPossible: boolean = !title.length || title.length > maxTitleLength


    const onKeyDownAddTaskHandler = isAddTaskNotPossible
    ? undefined
        :(e: KeyboardEvent<HTMLInputElement>)=> e.key === "Enter" && addTaskHandler()

    const longTimeWarning = title.length > recommendedLength && <div style={{color: "hotpink"}}>Title should be shorter</div>
    const longTitleErrorMessage = title.length > maxTitleLength && <div style={{color: "red"}}>Title too long!!</div>


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    placeholder={"Task title"}
                    value={title}
                    onChange={setLocalTitleHandler}
                    onKeyDown={onKeyDownAddTaskHandler}
                />
                {/*///e.currentTarget === input*/}
                <button
                    disabled={isAddTaskNotPossible}
                    onClick={addTaskHandler}
                >+</button>
                {longTimeWarning}
                {longTitleErrorMessage}
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
