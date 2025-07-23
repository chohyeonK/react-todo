import React from 'react'
import UpdatePopup from '../../components/UpdatePopup'
import TodoItem from '../../components/TodoItem'
import useTodo from '../../hooks/useTodo';
import { useEffect, useRef, useState } from 'react';
import Header from '../../components/Header';

const TodoUser = () => {
  const {
    todoList,
    insertData,
    deleteData,
    updateData,
    completedData,
    inputValue,
    handleInputChange,
    getTodoList
  } = useTodo();

  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showCompleted, setShowCompleted] = useState(true);
  const [selectedPriority, setSelectedPriority] = useState('');

  const handleInsert = () => {
    insertData();
  }

  const handleUpdate = (newData) => {
    updateData(newData);
    setOpen(false)
  }

  const toggleShowCompleted = () => {
    setShowCompleted((prev) => !prev);
  }

  const filterPriority = (e) => {
    const selectedValue = e.target.value;
    setSelectedPriority(selectedValue);
  }

  // 필터링된 리스트를 분리
  const filteredTodoList = todoList.filter((item) => {
    // 완료 여부
    if (!showCompleted && item.completed) return false;

    // 우선순위
    if (selectedPriority && item.priority !== selectedPriority) return false;

    return true;
  });

  useEffect(() => {
    const fetchData = async () => {
      await getTodoList(); // todoList 상태는 useTodo 내부에서 갱신될 것
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <Header />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">할 일 만들기</h1>

      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">할 일 제목</label>
          <input
            type="text"
            name="name"
            value={inputValue.name}
            onChange={handleInputChange}
            placeholder="예: 운동하기"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">마감일</label>
          <input
            type="date"
            name="end"
            value={inputValue.end}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">우선순위</label>
          <select
            name="priority"
            value={inputValue.priority}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="high">높음</option>
            <option value="middle">중간</option>
            <option value="low">낮음</option>
          </select>
        </div>

        <button
          onClick={handleInsert}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          추가
        </button>
      </div>

      <div className="mt-8 w-full max-w-md">
        <div className="mt-8 w-full max-w-md relative">
          <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">할 일 목록</h2>
          <button className="absolute top-0 right-0 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold text-sm px-3 py-1 rounded" onClick={toggleShowCompleted}>
            {showCompleted ? '완료 숨기기' : '완료 보기'}
          </button>
        </div>

        <div className='flex justify-end space-x-2 mb-3'>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={selectedPriority}
            onChange={filterPriority}
          >
            <option value="">우선순위 선택</option>
            <option value="high">높음</option>
            <option value="middle">중간</option>
            <option value="low">낮음</option>
          </select>
        </div>

        <ul className="space-y-4">
          {filteredTodoList
            .map((item) => (
              <TodoItem
                key={item.id}
                item={item}
                onComplete={completedData}
                onEdit={(id) => { setSelectedIndex(id); setOpen(true); }}
                onDelete={deleteData}
              />
            ))}
        </ul>
      </div>

      {open && selectedIndex !== null && (
        <UpdatePopup todo={todoList.find((todo) => todo.id === selectedIndex)} onUpdate={handleUpdate} onClose={() => setOpen(false)} />
      )}
    </div>
  )
}

export default TodoUser
