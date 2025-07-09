import './App.css';
import { useEffect, useRef, useState } from 'react';
import UpdatePopup from './components/UpdatePopup';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showCompleted, setShowCompleted] = useState(true);
  const idRef = useRef(1);
  const [selectedPriority, setSelectedPriority] = useState('');
  const [inputValue, setInputValue] = useState({
    name: '',
    end: '',
    completed: false,
    priority: 'middle',
    id: idRef.current
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
      priority: 'middle',
      id: idRef.current += 1
    });
  };

  const deleteData = (targetId) => {
    setTodoList((prev) => prev.filter((item) => item.id !== targetId));
  }

  const updateData = (newData) => {
    setTodoList((prev) => prev.map((item) => (item.id === selectedIndex ? newData : item)));
    setOpen(false);
  }

  const completedData = (targetId) => {
    setTodoList((prev) => prev.map((item) => item.id === targetId ? { ...item, completed: !item.completed} : item));
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
    if(!showCompleted && item.completed) return false;

    // 우선순위
    if(selectedPriority && item.priority !== selectedPriority) return false;

    return true;
  });

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
          <div className="mt-8 w-full max-w-md relative">
            <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">할 일 목록</h2>
            <button className="absolute top-0 right-0 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold text-sm px-3 py-1 rounded" onClick={toggleShowCompleted}>
              {setShowCompleted ? '완료 숨기기' : '완료 보기'}
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
              .map((item, index) => (
                <li
                  key={index}
                  className="p-4 bg-white rounded-xl border shadow-sm hover:shadow-md transition"
                >
                  {/* 우측 상단 버튼들 */}
                  <div className="flex justify-end space-x-2 mb-3">
                    <button
                      className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition"
                      title="완료"
                      onClick={() => completedData(item.id)}
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
                        setSelectedIndex(item.id);
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
                      onClick={() => deleteData(item.id)}
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
          <UpdatePopup todo={todoList.find((todo) => todo.id === selectedIndex)} onUpdate={updateData} onClose={() => setOpen(false)} />
        )}
      </div>
    </div>
  );
}

export default App;
