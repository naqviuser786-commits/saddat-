import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../AdminAuthContext";

export default function Login() {
  const { signIn } = useAdminAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    try { await signIn(email, password); nav("/admin"); }
    catch (e) { setError((e as Error).message); }
  };

  return (
    <div>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={submit}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
}