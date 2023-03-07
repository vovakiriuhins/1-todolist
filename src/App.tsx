import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";


export type FilterValuesType = "All" | "Active" | "Completed"

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}


function App(): JSX.Element {

    const [tasks, setTasks] = useState([
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "CSS & SCSS", isDone: true},
        {id: 3, title: "ES6/TS", isDone: false},
        {id: 4, title: "1111/TS", isDone: false},
    ])

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter((task) => task.id !== taskId))
    }


    const [filter, setFilter] = useState<FilterValuesType>("All")

    let tasksForRender = tasks;

    // if (filter === "All") {
    //     tasksForRender = tasks
    // }
    if (filter === "Active") {
        tasksForRender = tasks.filter((t) => t.isDone === false)
    }
    if (filter === "Completed") {
        tasksForRender = tasks.filter((t) => t.isDone === true)
    }

    const changeTodoListFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }


    return (
        <div className="App">
            <TodoList title={"What to learn?"}
                      tasks={tasksForRender}
                      removeTask={removeTask}
                      changeTodoListFilter={changeTodoListFilter}
            />

        </div>
    );
}

export default App;
