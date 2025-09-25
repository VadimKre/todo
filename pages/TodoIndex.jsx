import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg, eventBusService } from "../services/event-bus.service.js"

// import { SET_TODOS, ADD_TODO, UPDATE_TODO, REMOVE_TODO } from "../store/reducers/todo.reducer.js"
import { setTodos, removeTodo , updateTodo } from "../store/actions/todo.actions.js"
import { setFilter } from "../store/actions/filter.actions.js"
import { setIsLoading } from "../store/actions/loading.actions.js"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function TodoIndex() {

    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()

    // Holds the todoId pending confirmation; null means no modal
    // Confirmation is now handled globally via eventBus + ConfirmDialog

    const dispatch = useDispatch()
    const todos = useSelector(s => s.todosModule.todos)
    const filterBy = useSelector(s => s.filterModule.filterBy)
    const isLoading = useSelector(s => s.loadingModule.isLoading)

    useEffect(() => {
        const initial = todoService.getFilterFromSearchParams(searchParams)
        dispatch(setFilter(initial))
    }, [])

    useEffect(() => {
        if (!filterBy) return
        setSearchParams(filterBy)
        dispatch(setIsLoading(true))
        todoService.query(filterBy)
            .then(todos => dispatch(setTodos(todos)))
            .catch(err => {
                console.error('err:', err)
                showErrorMsg('Cannot load todos')
            })
            .finally(() => dispatch(setIsLoading(false)))
    }, [filterBy])


    function onRemoveTodo(todoId) {
        todoService.remove(todoId)
            .then(() => {
                dispatch(removeTodo(todoId))
                showSuccessMsg(`Todo removed`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot remove todo ' + todoId)
            })
    }

    // Ask for confirmation globally via the event bus
    function onAskRemoveTodo(todoId) {
        eventBusService.emit('confirm', {
            txt: 'Are you sure want to remove this ToDo?',
            okText: 'Confirm',
            cancelText: 'Cancel',
            onConfirm: () => onRemoveTodo(todoId),
        })
    }

    function onToggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }
        todoService.save(todoToSave)
            .then((savedTodo) => {
                dispatch(updateTodo(savedTodo))
                showSuccessMsg(`Todo is ${(savedTodo.isDone)? 'done' : 'back on your list'}`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot toggle todo ' + todo._id)
            })
    }

    if (!todos || isLoading) return <div>Loading...</div>
    return (
        <section className="todo-index">
            <TodoFilter filterBy={filterBy || { txt: '', importance: 0 }} onSetFilterBy={(next) => dispatch(setFilter(next))} />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>
            <h2>Todos List</h2>
            <TodoList todos={todos} onRemoveTodo={onAskRemoveTodo} onToggleTodo={onToggleTodo} />
            <hr />
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable todos={todos} onRemoveTodo={onAskRemoveTodo} />
            </div>
        </section>
    )
}
