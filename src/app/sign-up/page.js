"use client";
import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { FaUserCircle, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Formik } from "formik";
import NoteContext from "@/context/notes/NoteContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

const SignUp = () => {
  const router = useRouter();
  const { setProgress, title, setShowToast } = useContext(NoteContext);

  const signupSchema = Yup.object().shape({
    name: Yup.string().required("*required").max(50, "50 characters"),
    email: Yup.string().required("*required").email("Enter valid email"),
    password: Yup.string()
      .required("*required")
      .min(5, "Should be min of 5 characters")
      .max(30, "Should be max of 30 characters"),
  });

  const [isVisible, setIsVisible] = useState(false);

  const toggleEye = () => {
    setIsVisible(!isVisible);
  };
  useEffect(() => {
    setProgress(100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (name, email, password) => {
    let response;

    try {
      response = await fetch("http://localhost:3000/api/auth/sign-up", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        // console.log(data);
        localStorage.setItem("token", data.authToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.replace("/");
        setShowToast(toast.success(data.message));
        return;
      }
      console.log(data);
      setShowToast(
        toast.error(data.message || "Some error occurs please try again")
      );
    } catch (error) {
      alert(data.message);
      console.log({ error });
    }
  };

  return (
    <div className="p-3 min-h-screen bg-slate-300 flex flex-col justify-start items-center">
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={signupSchema}
        onSubmit={(values) => {
          // console.log(values);
          handleLogin(values.name, values.email, values.password);
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          /* and other goodies */
        }) => (
          <form
            className="inline-flex w-11/12 md:w-auto mx-4 mt-20 mb-20 bg-slate-50 border rounded-md shadow-lg items-center  flex-col text-center py-5 px-10"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl md:text-2xl mb-5 text-center font-semibold">
              Sign-Up to continue{" "}
              <Link
                className="font-bold text-slate-600"
                style={{ textShadow: "1px 1px pink" }}
                href="/"
              >
                Coding-
                <span
                  className="font-bold text-[gold]"
                  style={{ textShadow: "0.4px 0.4px white" }}
                >
                  Journal
                </span>
              </Link>
            </h2>
            {/* logo */}

            <div className={`${errors.name ? "mb-0" : "mb-7"}`}>
              <div
                className={`inline-flex bg-white p-3 ring-2 ${
                  errors.email ? "ring-red-400" : "ring-transparent"
                }  rounded-md shadow-lg items-center space-x-3 justify-center border`}
              >
                <label
                  htmlFor="name"
                  className="text-slate-800 cursor-pointer hover:text-slate-900"
                >
                  <FaUserCircle />
                </label>
                <input
                  type="text"
                  className="bg-transparent px-2 font-semibold placeholder:text-gray-500 placeholder:font-semibold outline-none"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                <AiFillEye className="invisible text-xl" />
              </div>
              <h2 className="text-red-500 my-1 font-semibold text-xs text-right">
                {errors.name}
              </h2>
            </div>

            <div className={`${errors.email ? "mb-0" : "mb-7"}`}>
              <div
                className={`inline-flex bg-white p-3 ring-2 ${
                  errors.email ? "ring-red-400" : "ring-transparent"
                }  rounded-md shadow-lg items-center space-x-3 justify-center border`}
              >
                <label
                  htmlFor="username"
                  className="text-slate-800 cursor-pointer hover:text-slate-900"
                >
                  <FaUserCircle />
                </label>
                <input
                  type="email"
                  className="bg-transparent px-2 font-semibold placeholder:text-gray-500 placeholder:font-semibold outline-none"
                  id="username"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <AiFillEye className="invisible text-xl" />
              </div>
              <h2 className="text-red-500 my-1 font-semibold text-xs text-right">
                {errors.email}
              </h2>
            </div>

            <div className={`${errors.password ? "mb-0" : "mb-7"}`}>
              <div
                className={`inline-flex bg-white p-3 ring-2 ${
                  errors.password ? "ring-red-400" : "ring-transparent"
                }  rounded-md shadow-lg items-center space-x-3 justify-center border`}
              >
                <label
                  htmlFor="userpassword"
                  className="text-slate-800 cursor-pointer hover:text-slate-900"
                >
                  <FaLock className="rounded-full" />
                </label>
                <input
                  type={isVisible === false ? "password" : "text"}
                  className="bg-transparent px-2 font-semibold placeholder:text-gray-500 placeholder:font-semibold outline-none"
                  id="userpassword"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <button
                  type="button"
                  className="cursor-pointer text-slate-800 text-xl hover:text-slate-900"
                  onClick={toggleEye}
                >
                  {isVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
                </button>
              </div>

              <h3 className="text-red-500 my-1 font-semibold text-xs text-right">
                {errors.password}
              </h3>
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className="bg-slate-800 mb-5  hover:bg-slate-900 p-2.5 text-white text-xl w-full font-semibold  border outline-none rounded-md shadow-md shadow-gray-400 cursor-pointer"
            >
              Sign-Up
            </button>

            <div className="mb-5">OR Login Account</div>
            <Link
              href="/login"
              className="bg-slate-800 mb-5  hover:bg-slate-900 p-2.5 text-white text-xl w-full font-semibold  border outline-none rounded-md shadow-md shadow-gray-400 cursor-pointer"
            >
              Login
            </Link>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
