import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebaseConfig";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentail) => {
        console.log(userCredentail.user);
        router.push("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(error.code);
        setError(errorMessage);
      });
  };

  return (
    <div className="bg-white">
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <div className="w-10/12 mx-auto md:w-96">
          <h1 className="mb-2 text-lg font-medium">로그인</h1>
          <form onSubmit={onSubmit}>
            <div className="mb-2">
              <input
                name="email"
                placeholder="Email"
                type="email"
                className="w-[calc(100%-1.5rem)] p-3 transition duration-200 border border-gray-400 bg-gray-50 focus:bg-white hover:bg-white"
                value={email}
                onChange={onChange}
              />
            </div>
            <div className="mb-2">
              <input
                name="password"
                placeholder="Password"
                type="password"
                className="w-[calc(100%-1.5rem)] p-3 transition duration-200 border border-gray-400 bg-gray-50 focus:bg-white hover:bg-white"
                value={password}
                onChange={onChange}
              />
            </div>
            {error && <span className="mb-2 text-red-500">{error}</span>}
            <button className="w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded cursor-pointer">
              로그인
            </button>
          </form>
          <small>
            아직 아이디가 없나요
            <Link href="/join" className="ml-1 text-blue-500 uppercase">
              회원가입
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
