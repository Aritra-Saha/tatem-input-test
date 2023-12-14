import { FormEvent, KeyboardEvent, useState, useRef, useEffect } from 'react';
import './App.css'

function App() {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [formData, setFormData] = useState(
    localStorage.getItem("formData")
    ? JSON.parse(localStorage.getItem("formData") as string)
    : {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }
  )

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
        setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 3));
        break;
      case 'ArrowDown':
        setSelectedIndex((prevIndex) => (prevIndex < 3 ? prevIndex + 1 : 0));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    switch (selectedIndex) {
      case 0:
        firstNameRef.current?.focus();
        break;
      case 1:
        lastNameRef.current?.focus();
        break;
      case 2:
        emailRef.current?.focus();
        break;
      case 3:
        passwordRef.current?.focus();
        break;
    }
  }, [selectedIndex]);

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  }

  const submitForm = (e: FormEvent) => {
    e.preventDefault();

    const curFormData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }

    localStorage.setItem("formData", JSON.stringify(curFormData));

    setFormData(curFormData);

    resetForm();
  }

  return (
    <div className='mx-auto max-w-screen-lg min-h-screen flex flex-col md:flex-row items-center justify-center'>
      <div>
        <img src='/tatem-logo.png' className='w-8 h-8 mb-2 mx-auto' />
        <h1 className='text-3xl text-center mb-4'>Tatem Inputs</h1>
        <div className='my-3'>
          Submitted form inputs:
          <span>First Name: {formData.firstName}</span>
          <span>Last Name: {formData.lastName}</span>
          <span>Email: {formData.email}</span>
          <span>Password: {formData.password}</span>
        </div>
      </div>
      <form
        onKeyDown={handleKeyDown}
        className="flex mx-auto max-w-2xl flex-col items-center gap-3"
        onSubmit={(e) => submitForm(e)}
      >
        <label className='flex flex-col items-start w-full gap-1'>
          <span className='text-xs text-left text-gray-700'>First Name</span>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onClick={() => setSelectedIndex(0)}
            ref={firstNameRef}
            className='w-full rounded border border-gray-100 px-3 py-1'
          />
        </label>
        <label className='flex flex-col items-start w-full gap-1'>
          <span className='text-xs text-gray-700'>Last Name</span>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onClick={() => setSelectedIndex(1)}
            ref={lastNameRef}
            className='w-full rounded border border-gray-100 px-3 py-1'
          />
        </label>
        <label className='flex flex-col items-start w-full gap-1'>
          <span className='text-xs text-gray-700'>Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onClick={() => setSelectedIndex(2)}
            ref={emailRef}
            className='w-full rounded border border-gray-100 px-3 py-1'
          />
        </label>
        <label className='flex flex-col items-start w-full gap-1'>
          <span className='text-xs text-gray-700'>Password</span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onClick={() => setSelectedIndex(3)}
            ref={passwordRef}
            type='password'
            className='w-full rounded border border-gray-100 px-3 py-1'
          />
        </label>
        <button className='mt-2 border rounded px-2 py-0.5 hover:cursor-pointer border-black hover:bg-black hover:text-white duration-150' type='submit'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default App
