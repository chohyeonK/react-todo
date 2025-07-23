import { useRef, useState } from 'react';
import { db, addDoc, collection, updateDoc, deleteDoc, getDocs, doc } from "../firebase";
import useUserStore from "../stores/useUserStore";


export default function useTodo() {
    const [todoList, setTodoList] = useState([]);
    const idRef = useRef(1);
    const user = useUserStore((state) => state.user);

    const [inputValue, setInputValue] = useState({
        name: '',
        end: '',
        completed: false,
        priority: 'middle'
    });

    const insertData = () => {
        if (inputValue.name.trim() === '') return;

        const newTodo = {
            ...inputValue,
            id: idRef.current++
        };

        setTodoList((prev) => [...prev, newTodo]);

        setInputValue({
            name: '',
            end: '',
            completed: false,
            priority: 'middle'
        })

        // 회원이라면 투두 db 저장 로직 실행
        if (user !== null) {
            saveSingleTodo(newTodo);
        }
    };

    const deleteData = (targetId) => {
        setTodoList((prev) => prev.filter((item) => item.id !== targetId));

        if (user !== null) {
            deleteTodo(targetId);
        }
    }

    const updateData = (newData) => {
        setTodoList((prev) => prev.map((item) => (item.id === newData.id ? newData : item)));

        if (user !== null) {
            updateTodo(newData);
        }
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

    // 회원 투두 db 저장 로직
    const saveSingleTodo = async (todo) => {
        if (!user || !todo?.name || !todo?.end || typeof todo?.completed !== 'boolean') return;

        try {
            const todosRef = collection(db, 'users', user.uid, 'todos');
            const docRef = await addDoc(todosRef, {
                name: todo.name,
                end: todo.end,
                completed: todo.completed,
                priority: todo.priority || 'normal',
                createdAt: new Date(),
            });

            // 저장 후 id를 todoList에 반영
            setTodoList((prev) =>
                prev.map((item) =>
                    item === todo ? { ...item, id: docRef.id } : item
                )
            );
        } catch (err) {
            console.error('저장 실패:', err);
        }
    };

    const updateTodo = async (todo) => {
        const todoRef = doc(db, 'users', user.uid, 'todos', todo.id);

        try {
            await updateDoc(todoRef, {
                name: todo.name,
                end: todo.end,
                completed: todo.completed,
                priority: todo.priority,
            });
        } catch (err) {
            console.log('수정 실패: ', err);
        }
    };


    const deleteTodo = async (targetId) => {
        try {
            await deleteDoc(doc(db, 'users', user.uid, 'todos', targetId));
        } catch (err) {
            console.log('삭제 실패: ', err);
        }
    }

    const getTodoList = async () => {
        const listData = collection(db, 'users', user.uid, 'todos');
        const snapshot = await getDocs(listData);

        const todos = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setTodoList(todos);
    }

    return {
        todoList,
        insertData,
        deleteData,
        updateData,
        completedData,
        inputValue,
        handleInputChange,
        getTodoList
    }
}