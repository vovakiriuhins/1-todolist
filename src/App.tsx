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


    if (filter === "Active") {
        tasksForRender = tasks.filter((t) => t.isDone === false)
    }
    if (filter === "Completed") {
        tasksForRender = tasks.filter((t) => t.isDone === true)
    }

    const changeTodoListFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    ///////


    const addTask = (title: string) => {
        let newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        };
    setTasks([newTask, ...tasks])
    }





    return (
        <div className="App">
            <TodoList title={"What to learn?"}
                      tasks={tasksForRender}
                      removeTask={removeTask}
                      changeTodoListFilter={changeTodoListFilter}
                      addTask={addTask}
            />

        </div>
    );
}

export default App;
