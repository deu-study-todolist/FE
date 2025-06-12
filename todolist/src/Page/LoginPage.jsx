import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const loginUser = {
      email: email,
      password: pw,
    };

    axios
      .post("http://localhost:8080/api/auth/login", loginUser, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data && res.data.email === email) {
          sessionStorage.setItem("user", email);
          navigate("/TodoList");
        } else {
          alert("이메일 또는 비밀번호가 일치하지 않습니다.");
        }
      })
      .catch(() => {
        alert("로그인 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          로그인
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700 transition"
          >
            로그인
          </button>
        </form>
        <div className="mt-6 text-center">
          <button
            className="text-purple-600 hover:text-purple-800 font-medium underline"
            onClick={() => navigate("/SignUp")}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
