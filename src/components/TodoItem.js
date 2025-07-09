import React from 'react'

const TodoItem = ({ item, onComplete, onEdit, onDelete }) => {
    return (
        <div>
            <li
                className="p-4 bg-white rounded-xl border shadow-sm hover:shadow-md transition"
            >
                {/* 우측 상단 버튼들 */}
                <div className="flex justify-end space-x-2 mb-3">
                    <button
                        className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition"
                        title="완료"
                        onClick={() => onComplete(item.id)}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"
                            viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 13l4 4L19 7" />
                        </svg>
                    </button>

                    <button
                        className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                        title="수정"
                        onClick={() => onEdit(item.id)}
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
                        onClick={() => onDelete(item.id)}
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
        </div>
    )
}

export default TodoItem
