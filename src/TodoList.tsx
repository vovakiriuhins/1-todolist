import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string)=> void
    changeTodoListFilter: (filter: FilterValuesType) => void
    addTask:(title: string)=>void
    changeTaskStatus:(taskID: string, newIsDone: boolean)=>void
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList: FC<TodoListPropsType> = (props) => {



    const [title, setTitle] = useState("")

    const [error, setError] = useState<boolean>(false)

    const addTaskHandler = ()=> {
        const trimmedTitle = title.trim()
        if (trimmedTitle){
            props.addTask(trimmedTitle)

        } else {
            setError(true)
        }
        setTitle("")
    }



    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }


    const maxTitleLength = 20
    const recommendedLength = 10
    const isAddTaskNotPossible: boolean = !title.length || title.length > maxTitleLength


    const onKeyDownAddTaskHandler = isAddTaskNotPossible
    ? undefined
        :(e: KeyboardEvent<HTMLInputElement>)=> e.key === "Enter" && addTaskHandler()

    const longTimeWarning = title.length > recommendedLength && <div style={{color: "orange"}}>Title should be shorter</div>
    const longTitleErrorMessage = title.length > maxTitleLength && <div style={{color: "hotpink"}}>Title too long!!</div>
    const errorMessage = error && <div style={{color: "red"}}>Title is hard required!!</div>





    const todoListItems = props.tasks.map((task, index) => {
        const removeTaskHandler = () => props.removeTask(task.id);
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)



        return (
            <li key={index}>
                <input
                    onChange={changeStatus}
                    type="checkbox"
                    checked={task.isDone}/>
                <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    placeholder={"Task title"}
                    value={title}
                    onChange={setLocalTitleHandler}
                    onKeyDown={onKeyDownAddTaskHandler}
                    className={error ? "input-error" : ""}
                />
                {/*///e.currentTarget === input*/}
                <button
                    disabled={isAddTaskNotPossible}
                    onClick={addTaskHandler}
                >+</button>
                {longTimeWarning}
                {longTitleErrorMessage}
                {errorMessage}
            </div>
            <ul>
                {todoListItems}
            </ul>
            <div>
                <button className={props.filter === "All" ? "btn-active" : ""} onClick={()=>{props.changeTodoListFilter("All")}}>All</button>
                <button className={props.filter === "Active" ? "btn-active" : ""} onClick={()=>{props.changeTodoListFilter("Active")}}>Active</button>
                <button className={props.filter === "Completed" ? "btn-active" : ""} onClick={()=>{props.changeTodoListFilter("Completed")}}>Completed</button>
            </div>
        </div>
    );
};
