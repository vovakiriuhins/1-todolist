import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";


export type FilterValuesType = "All" | "Active" | "Completed"


function App(): JSX.Element {

    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "CSS & SCSS", isDone: true},
        {id: v1(), title: "ES6/TS", isDone: false},
        {id: v1(), title: "1111/TS", isDone: false},
    ])

    ////remove task
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter((task) => task.id !== taskId))
    }
    ////




    ////filter
    const [filter, setFilter] = useState<FilterValuesType>("All")

    let tasksForRender = tasks;

    // if (filter === "Active") {
    //     tasksForRender = tasks.filter((t) => t.isDone === false)
    // }
    // if (filter === "Completed") {
    //     tasksForRender = tasks.filter((t) => t.isDone === true)
    // }
    //
    const changeTodoListFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    ///////

    const getFilteredTasksForRender = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "Active":
                return tasksList.filter(t => !t.isDone)
            case "Completed":
                return tasksList.filter(t => t.isDone)
            default:
                return tasksList
        }
    }


    const addTask = (title: string) => {
        let newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        };
    setTasks([newTask, ...tasks])
    }


    const changeTaskStatus = (taskId: string, newIsDone: boolean) => {

        setTasks(tasks.map(t=>t.id === taskId ? {...t, isDone: newIsDone} : t))
    }



    return (
        <div className="App">
            <TodoList title={"What to learn?"}
                      tasks={getFilteredTasksForRender(tasks, filter)}
                      removeTask={removeTask}
                      changeTodoListFilter={changeTodoListFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                        filter={filter}
            />

        </div>
    );
}

export default App;
