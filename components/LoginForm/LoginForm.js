"use client";
import React, { useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [validator] = useState(
        new SimpleReactValidator({
            className: "errorMessage",
        })
    );

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        validator.showMessages();
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!validator.allValid()) {
            validator.showMessages();
            toast.error("Please fill in all fields correctly.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || "Login failed");
                setError(data.message);
                return;
            }

            toast.success("Login successful!");
            router.push("/account");
        } catch (err) {
            console.error("Login error:", err);
            toast.error("Something went wrong!");
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} />
            <form
                className="it-contact-form commentsPost commentsPost--style2 pt-45 pb-25"
                onSubmit={submitHandler}
            >
                <div className="row g-4">
                    <div className="col-md-12">
                        <div className="commentsPost__input">
                            <label htmlFor="email" className="form-label">
                                Email Address*
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="form-control"
                                value={form.email}
                                onChange={changeHandler}
                                placeholder="Enter your email*"
                            />
                            {validator.message("email", form.email, "required|email")}
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="commentsPost__input">
                            <label htmlFor="password" className="form-label">
                                Password*
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                value={form.password}
                                onChange={changeHandler}
                                placeholder="Enter your password*"
                            />
                            {validator.message("password", form.password, "required")}
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="commentsPost__button text-center">
                            <button
                                type="submit"
                                className="btn btn--styleOne btn--primary it-btn"
                                disabled={loading}
                            >
                                <span className="btn__text">
                                    {loading ? "Logging in..." : "Login"}
                                </span>
                                <i className="fa-solid fa-arrow-right btn__icon"></i>
                            </button>
                        </div>
                    </div>

                    <div className="col-12 text-center">
                        <span>
                            Don't have an account? <a href="/register">Register Here.</a>
                        </span>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
