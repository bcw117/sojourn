import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" className="rounded bg-blue-200 border-blue-500 text-blue-800" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" className="rounded bg-blue-200 border-blue-500 text-blue-800" required />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
  );
}
