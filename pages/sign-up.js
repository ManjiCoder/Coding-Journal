import React, { useState } from "react";
import * as Yup from "yup";
import { FaUserCircle, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "@/redux-slices/User";

import BrandHead from "@/components/BrandHead";
import Header from "@/components/Header";
import ErrorMessage from "@/components/ErrorMessage";

export default function SignUp() {
  const { title, toastDuration } = useSelector((state) => state.static);
  const router = useRouter();
  const dispatch = useDispatch();

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

  const handleSignUp = async (name, email, password) => {
    const toastId = toast.loading("Please wait...");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sign-up`,
        {
          method: "POST",
          body: JSON.stringify({ name, email, password }),
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
      console.log(data);
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
    <>
      <Header title={`SignUp - ${title}`} />
      <div
        id="main-container"
        className="p-3 min-h-screen flex flex-col justify-start items-center"
      >
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={signupSchema}
          onSubmit={(values) => {
            // console.log(values);
            handleSignUp(values.name, values.email, values.password);
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
              className="inline-flex w-11/12 md:w-auto mx-4 mt-20 mb-20 bg-gradient-to-br from-white to-slate-100 border rounded-md shadow-lg items-center  flex-col text-center py-5 px-10"
              onSubmit={handleSubmit}
            >
              <h2 className="text-xl flex md:block flex-col pt-3 gap-y-2 md:text-2xl mb-5 text-center font-semibold">
                Sign-Up to continue <BrandHead />
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
                    className="bg-transparent px-2 font-semibold placeholder:text-gray-500 placeholder:font-semibold outline-none w-52"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  <AiFillEye className="invisible text-xl" />
                </div>

                <ErrorMessage error={errors.name} />
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
                    className="bg-transparent px-2 font-semibold placeholder:text-gray-500 placeholder:font-semibold outline-none w-52"
                    id="username"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <AiFillEye className="invisible text-xl" />
                </div>

                <ErrorMessage error={errors.email} />
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
                    className="bg-transparent px-2 font-semibold placeholder:text-gray-500 placeholder:font-semibold outline-none w-52"
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

                <ErrorMessage error={errors.password} />
              </div>

              <button
                type="submit"
                disabled={!isValid}
                className="bg-slate-800 mb-5  hover:bg-slate-900 p-2.5 text-white text-xl w-72 font-semibold  border outline-none rounded-md shadow-md shadow-gray-400 cursor-pointer"
              >
                Sign-Up
              </button>

              <div className="mb-5">OR Login Account</div>
              <Link
                href="/login"
                className="bg-slate-800 mb-5  hover:bg-slate-900 p-2.5 text-white text-xl w-72 font-semibold  border outline-none rounded-md shadow-md shadow-gray-400 cursor-pointer"
              >
                Login
              </Link>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}

// SSR
export async function getServerSideProps({ req }) {
  const { token } = req.cookies;
  // console.log({ token });
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
