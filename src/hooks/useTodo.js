import { useRef, useState } from 'react';

export default function useTodo() {
    const [todoList, setTodoList] = useState([]);
    const idRef = useRef(1);
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState({
        name: '',
        end: '',
        completed: false,
        priority: 'middle'
    });



    const insertData = (todo) => {
        if (todo.name.trim() === '') return;

        const newTodo = {
            ...todo,
            id: idRef.current++
        };

        setTodoList((prev) => [...prev, newTodo]);

        setInputValue({
            name: '',
            end: '',
            completed: false,
            priority: 'middle'
        })
    };

    const deleteData = (targetId) => {
        setTodoList((prev) => prev.filter((item) => item.id !== targetId));
    }

    const updateData = (newData) => {
        setTodoList((prev) => prev.map((item) => (item.id === newData.id ? newData : item)));
    }

    const completedData = (targetId) => {
        setTodoList((prev) => prev.map((item) => item.id === targetId ? { ...item, completed: !item.completed } : item));
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return {
        todoList,
        insertData,
        deleteData,
        updateData,
        completedData,
        inputValue,
        handleInputChange
    }
}