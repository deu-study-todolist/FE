import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setPasswordMatch(pw !== "" && pw === pwConfirm);
  }, [pw, pwConfirm]);

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!email || !pw || !pwConfirm) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    if (!passwordMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const userData = {
      email: email,
      password: pw,
    };

    axios
      .post("http://localhost:8080/api/auth/signup", userData, {
        withCredentials: true,
      })
      .then(() => {
        alert("회원가입 성공");
        navigate("/");
      })
      .catch(() => {
        console.log(userData);
        alert("회원가입 오류");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          회원가입
        </h2>
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
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
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
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
          <div>
            <label
              htmlFor="passwordConfirm"
              className="block text-gray-700 font-medium mb-2"
            >
              비밀번호 확인
            </label>
            <input
              id="passwordConfirm"
              type="password"
              value={pwConfirm}
              onChange={(e) => setPwConfirm(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder="비밀번호를 다시 입력하세요"
            />
          </div>
          <div className="text-center">
            {pw && pwConfirm && (
              <span
                className={`font-semibold ${
                  passwordMatch ? "text-green-600" : "text-red-600"
                }`}
              >
                {passwordMatch
                  ? "비밀번호가 일치합니다."
                  : "비밀번호가 일치하지 않습니다."}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700 transition"
          >
            회원가입
          </button>
        </form>
        <div className="mt-6 text-center">
          <button
            className="text-purple-600 hover:text-purple-800 font-medium underline"
            onClick={() => navigate("/")}
          >
            로그인 페이지로 이동
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
