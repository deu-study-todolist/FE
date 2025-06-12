import React, { useState, useEffect } from "react";
import axios from "axios";

function TodoList() {
  const [task, setTask] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/todos")
      .then(res => setTodoList(res.data))
      .catch(() => console.error("실패"));
  }, []);

  const handleAddTask = () => {
    if (task.trim() === "") {
      alert("할 일을 입력해주세요.");
      return;
    }

    const newTodo = {
      title: task,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    axios.post("http://localhost:8080/api/todos", newTodo)
      .then(res => {
        setTodoList([...todoList, res.data]);
        setTask("");
      })
      .catch(() => console.error("실패"));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/todos/${id}`)
      .then(() => {
        setTodoList(todoList.filter(item => item.id !== id));
      })
      .catch(() => console.error("실패"));
  };

  const handleToggle = (id) => {
    const todo = todoList.find(item => item.id === id);
    if (!todo) return;

    const updatedTodo = { ...todo, completed: !todo.completed };

    axios.put(`http://localhost:8080/api/todos/${id}`, updatedTodo)
      .then(res => {
        setTodoList(todoList.map(item => item.id === id ? res.data : item));
      })
      .catch(() => console.error("실패"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-xl max-w-xl w-full p-8 sm:p-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">TodoList</h1>

        <div className="flex mb-6 border border-gray-300 rounded-md overflow-hidden">
          <input
            type="text"
            className="flex-grow px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            placeholder="할 일을 입력하세요"
            value={task}
            onChange={e => setTask(e.target.value)}
          />
          <button
            onClick={handleAddTask}
            className="bg-purple-600 text-white px-6 hover:bg-purple-700 transition"
          >
            추가
          </button>
        </div>

        <ul className="divide-y divide-gray-200">
          {todoList.length === 0 && (
            <li className="text-center text-gray-400 italic select-none py-4">
              할 일이 없습니다.
            </li>
          )}

          {todoList.map(item => (
            <li key={item.id} className="flex items-center justify-between py-3">
              <span
                onClick={() => handleToggle(item.id)}
                className={`cursor-pointer select-none ${item.completed ? "line-through text-gray-400" : "text-gray-900"}`}
              >
                {item.title}
              </span>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 hover:text-red-700 font-medium"
                aria-label="삭제 버튼"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
