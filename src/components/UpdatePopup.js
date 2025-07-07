import { useState } from 'react'

const UpdatePopup = ({ todo, onUpdate, onClose }) => {
    const [form, setForm] = useState({...todo});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((todo) => ({...todo, [name]:value})); 
    }

    const handleSubmit = () => {
        onUpdate(form);
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                <h2 className="text-lg font-bold mb-4">할 일 수정</h2>
                <div className="space-y-3">
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="할 일"
                    />
                    <input
                        name="end"
                        type="date"
                        value={form.end}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                    <select
                        name="priority"
                        value={form.priority}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value="high">높음</option>
                        <option value="middle">중간</option>
                        <option value="low">낮음</option>
                    </select>
                </div>

                <div className="mt-5 flex justify-end space-x-2">
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        저장
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdatePopup
