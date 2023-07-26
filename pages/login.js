import React, { useState } from "react";
import Link from "next/link";
import * as Yup from "yup";
import { FaUserCircle, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "@/redux-slices/User";
import { toast } from "react-toastify";
import Head from "next/head";

export default function Login() {
  const { title, toastDuration } = useSelector((state) => state.static);
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  const loginSchema = Yup.object().shape({
    email: Yup.string().required("*required").email("Enter valid email"),
    password: Yup.string()
      .required("*required")
      .min(5, "Should be min of 5 characters")
      .max(30, "Should be max of 30 characters"),
  });

  const toggleEye = () => {
    setIsVisible(!isVisible);
  };

  const handleLogin = async (email, password) => {
    const toastId = toast.loading("Please wait...");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        dispatch(logIn(data.user));
        toast.update(toastId, {
          render: data.message,
          type: "success",
          isLoading: false,
          autoClose: toastDuration,
          closeButton: true,
          closeOnClick: true,
        });
        router.replace("/");
        return;
      }
      // console.log(data.message);
      toast.update(toastId, {
        render: data.message,
        type: "error",
        isLoading: false,
        autoClose: toastDuration,
        closeButton: true,
        closeOnClick: true,
      });
    } catch (error) {
      toast.update(toastId, {
        render: error.message || "Internal server error",
        type: "error",
        closeButton: true,
        closeOnClick: true,
      });
      console.log({ error });
    }
  };

  return (
    <div className="p-3 min-h-screen bg-slate-300 flex flex-col justify-start items-center">
      <Head>
        <title>{title} - Login</title>
      </Head>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          // console.log(values);
          handleLogin(values.email, values.password);
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
              Login to continue{" "}
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
            <div className={`${errors.email ? "mb-0" : "mb-7"}`}>
              <div
                className={`inline-flex bg-white p-3 ring-2 ${
                  errors.email ? "ring-red-400" : "ring-transparent"
                }  rounded-md shadow-lg items-center space-x-3 justify-center border`}
              >
                <label
                  htmlFor="email"
                  className="text-slate-800 cursor-pointer hover:text-slate-900"
                >
                  <FaUserCircle />
                </label>
                <input
                  type="email"
                  className="bg-transparent px-2 font-semibold placeholder:text-gray-500 placeholder:font-semibold outline-none"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <AiFillEye className="invisible text-xl" />
              </div>
              <h2 className="text-right px-3 text-red-500 my-1 font-semibold text-xs">
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
                  className="cursor-pointer text-slate-800 text-xl hover:text-slate-900 font-serif"
                  onClick={toggleEye}
                >
                  {isVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
                </button>
              </div>

              <h3 className="text-right px-3 text-slate-800 my-1 font-semibold text-xs">
                <Link href="/forgot">Forgot Password?</Link>
              </h3>
              <h3 className="text-right px-3 text-red-500 my-1 font-semibold text-xs">
                {errors.password}
              </h3>
            </div>
            <button
              type="submit"
              disabled={!isValid}
              className="bg-slate-800 mb-5  hover:bg-slate-900 p-2.5 text-white text-xl w-full font-semibold  border outline-none rounded-md shadow-md shadow-gray-400 cursor-pointer"
            >
              Login
            </button>

            <div className="mb-5">OR Create Account</div>
            <Link
              href="/sign-up"
              className="bg-slate-800 mb-5  hover:bg-slate-900 p-2.5 text-white text-xl w-full font-semibold  border outline-none rounded-md shadow-md shadow-gray-400 cursor-pointer"
            >
              Sign-up
            </Link>
          </form>
        )}
      </Formik>
    </div>
  );
}

// SSR
export async function getServerSideProps({ req }) {
  const { token } = req.cookies;
  // console.log(token);
  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: {} };
}
