import './App.css';
import { useEffect, useState } from 'react';
import UpdatePopup from './components/UpdatePopup';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [inputValue, setInputValue] = useState({
    name: '',
    end: '',
    completed: false,
    priority: 'middle'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const insertData = () => {
    if (inputValue.name.trim() === '') return;
    setTodoList((prev) => [...prev, inputValue]);
    setInputValue({
      name: '',
      end: '',
      completed: false,
      priority: 'middle'
    });
  };

  const deleteData = (paramIndex) => {
    setTodoList((todo) => todo.filter((_, index) => index != paramIndex));
  }

  const updateData = (newData) => {
    setTodoList((todo) =>
      todo.map((item, i) => (i === selectedIndex ? newData : item))
    );
    setOpen(false);
  }

  const completedData = (index) => {
    setTodoList(todoList.map((todo, idx) =>
      idx === index ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  return (
    <div className="App">
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
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
            onClick={insertData}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            추가
          </button>
        </div>

        <div className="mt-8 w-full max-w-md">
          <h2 className="text-xl font-bold text-gray-700 mb-4">할 일 목록</h2>
          <ul className="space-y-4">
            {todoList.map((item, index) => (
              <li
                key={index}
                className="p-4 bg-white rounded-xl border shadow-sm hover:shadow-md transition"
              >
                {/* 우측 상단 버튼들 */}
                <div className="flex justify-end space-x-2 mb-3">
                  <button
                    className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition"
                    title="완료"
                    onClick={()=>completedData(index)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"
                      viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </button>

                  <button
                    className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                    title="수정"
                    onClick={() => {
                      setSelectedIndex(index);
                      setOpen(true);
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"
                      viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </button>

                  <button
                    className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                    title="삭제"
                    onClick={() => deleteData(index)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"
                      viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18" />
                      <path d="M8 6v14a2 2 0 002 2h4a2 2 0 002-2V6" />
                      <path d="M10 11v6M14 11v6" />
                    </svg>
                  </button>
                </div>

                {/* 할 일 내용 */}
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <span
                    className={`text-sm font-medium ${item.priority === 'high'
                      ? 'text-red-500'
                      : item.priority === 'middle'
                        ? 'text-yellow-500'
                        : 'text-green-500'
                      }`}
                  >
                    {item.priority === 'high'
                      ? '🔴 높음'
                      : item.priority === 'middle'
                        ? '🟡 중간'
                        : '🟢 낮음'}
                  </span>
                </div>

                <p className="text-sm text-gray-600">마감일: {item.end || '없음'}</p>
                <p className="text-sm text-gray-600">
                  상태: {item.completed ? '✅ 완료됨' : '⏳ 미완료'}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {open && selectedIndex !== null && (
          <UpdatePopup todo={todoList[selectedIndex]} onUpdate={updateData} onClose={() => setOpen(false)} />
        )}
      </div>
    </div>
  );
}

export default App;
