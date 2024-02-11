import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth.service";
import { createUserHandle, getUserByUsername } from "../../services/users.service";

export default function Register() {
  const { setUser } = useContext(AuthContext);
  const [form, setForm] = useState({
    email: '',
    password: '',
    username: '',
});

  const navigate = useNavigate();

  const updateForm = prop => e => {
    setForm({ ...form, [prop]: e.target.value });
  };

  const register = async () => {
    try {
      const user = await getUserByUsername(form.username);

      if (user.exists()) {
        console.log(user.val());
        return console.log(`The user ${form.username} already exists`);
      }

      const credentials = await registerUser(form.email, form.password);
      await createUserHandle(form.username, credentials.user.uid, form.email, 'user');

      setUser({ user, userData: null });
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <label htmlFor="email">Email: </label><input value={form.email} onChange={updateForm('email')} type="text" name="email" id="email" /><br/>
      <label htmlFor="password">Password: </label><input value={form.password} onChange={updateForm('password')} type="password" name="password" id="password" /><br/>
      <label htmlFor="username">Username: </label><input value={form.username} onChange={updateForm('username')} type="text" name="username" id="username" /><br/>
      <button onClick={register}>Register</button>
    </div>
  )
}