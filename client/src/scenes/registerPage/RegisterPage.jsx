import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const RegisterPage = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // creates a set of key-value pairs representing form fields and their values,
    // including files selected through file input fields.
    // Content-Type header will be automatically set when using a FormData object.
    const formData = new FormData();
    const fullName = e.target.name.value;
    const nameParts = fullName.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", e.target.email.value);
    formData.append("password", e.target.password.value);
    formData.append("location", e.target.location.value);
    formData.append("occupation", e.target.occupation.value);
    if (e.target.picture.files[0])
      formData.append("picturePath", e.target.picture.files[0].name);
    console.log(formData);
    const response = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log("register data ", data);
    if (response.ok || data.statusCode === 201) {
      alert("Registration successful");
      navigate("/");
    } else {
      alert("Unsuccessful registration");
    }
  };

  return (
    <div>
      <div class="h-screen md:flex">
        <div class="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
          <div>
            <h1 class="text-white font-bold text-4xl font-sans">TOGETHER.</h1>
            <p class="text-white mt-1">
              Uniting Moments, Amplifying Connections.
            </p>
            <button
              type="submit"
              class="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
            >
              JOIN US
            </button>
          </div>
          <div class="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div class="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div class="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div class="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        </div>
        <div class="flex md:w-1/2 justify-center py-10 items-center bg-white">
          <form
            class="bg-white"
            onSubmit={handleSubmit}
            action="/auth/register"
            method="post"
          >
            <h1 class="text-gray-800 font-bold text-2xl mb-1">
              Unlock Your Journey!
            </h1>
            <p class="text-sm font-normal text-gray-600 mb-7">Welcome</p>
            <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <input
                accept="image/*"
                type="file"
                id="select-image"
                style={{ display: "none" }}
                name="picture"
              />
              <label htmlFor="select-image">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="h-5 w-5 text-blue-400 cursor-pointer"
                  fill="currentColor"
                >
                  <path d="M21 7L16 2H3.9934C3.44495 2 3 2.44405 3 2.9918V21.0082C3 21.5447 3.44476 22 3.9934 22H20.0066C20.5551 22 21 21.556 21 21.0082V7ZM11 9.5C11 10.3284 10.3284 11 9.5 11C8.67157 11 8 10.3284 8 9.5C8 8.67157 8.67157 8 9.5 8C10.3284 8 11 8.67157 11 9.5ZM17.5 17H8L13.5 10L17.5 17Z"></path>
                </svg>
              </label>
              <input
                class="pl-2 outline-none border-none bg-transparent"
                type="text"
                name="name"
                placeholder="| Full Name"
                required
              />
            </div>
            <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15ZM12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13Z"></path>
              </svg>
              <input
                class="pl-2 outline-none border-none bg-transparent"
                type="text"
                name="location"
                placeholder="Location"
              />
            </div>
            <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21 20H23V22H1V20H3V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V20ZM8 11V13H11V11H8ZM8 7V9H11V7H8ZM8 15V17H11V15H8ZM13 15V17H16V15H13ZM13 11V13H16V11H13ZM13 7V9H16V7H13Z"></path>
              </svg>
              <input
                class="pl-2 outline-none border-none bg-transparent"
                type="text"
                name="occupation"
                placeholder="Occupation"
              />
            </div>
            <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                class="pl-2 outline-none border-none bg-transparent"
                type="text"
                name="email"
                placeholder="Email Address"
                required
              />
            </div>
            <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                class="pl-2 outline-none border-none bg-transparent"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <button
              type="submit"
              class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              Register
            </button>
            <span class="text-sm ml-2">Already a user?</span>
            <Button
              className="bg-transparent border-none"
              onClick={() => navigate("/")}
            >
              <span class="text-sm font-medium hover:text-blue-500 cursor-pointer">
                Sign In
              </span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

// <h1 className="text-center p-3 font-bold text-5xl mt-10 md:mt-12 mb-10">
//   Sign Up
// </h1>
// <form
//   onSubmit={handleSubmit}
//   action="/auth/register"
//   method="post"
//   className="flex mx-auto flex-col gap-5 max-w-xs md:max-w-md"
// >
//   <div className="flex gap-5 justify-between">
//     <TextField
//       label="Name"
//       type="text"
//       variant="filled"
//       name="name"
//       sx={{
//         width: "100%",
//       }}
//       required
//     />
//   </div>
//   <TextField
//     label="Location"
//     type="text"
//     variant="filled"
//     name="location"
//     sx={{
//       width: "100%",
//     }}
//   />
//   <TextField
//     label="Occupation"
//     type="text"
//     variant="filled"
//     name="occupation"
//     sx={{
//       width: "100%",
//     }}
//   />
//   <TextField
//     label="Email"
//     type="email"
//     variant="filled"
//     name="email"
//     required
//     sx={{
//       width: "100%",
//     }}
//   />
//   <TextField
//     label="Password"
//     type="password"
//     autoComplete="current-password"
//     variant="filled"
//     name="password"
//     required
//     sx={{
//       width: "100%",
//     }}
//   />
//   <input
//     accept="image/*"
//     type="file"
//     id="select-image"
//     style={{ display: "none" }}
//     name="picture"
//   />
//   <label htmlFor="select-image">
//     <Button variant="contained" color="primary" component="span">
//       Upload Image
//     </Button>
//   </label>
//   <Button
//     variant="contained"
//     type="submit"
//     sx={{
//       width: "100%",
//     }}
//   >
//     Submit
//   </Button>
// </form>
