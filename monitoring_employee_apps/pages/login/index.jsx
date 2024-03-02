import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import Title from "../../components/text/title";
import Button from "../../components/button";
import { apiEmployeeBasic } from "../../api";

const LoginPage = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({});

	const onSubmit = async (formData) => {
		try {
			const { data } = await apiEmployeeBasic({
				method: "post",
				url: "/login_hr",
				data: {
					email: formData.email,
					password: formData.password,
				},
			});

			localStorage.setItem("dataLoginHr", JSON.stringify(data));
			router.push("/");
		} catch (err) {
			if (err.response && err.response.data) {
				setError("password", { message: err.response.data.message });
			} else {
				setError("password", { message: "server error" });
			}
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("dataLoginHr");

		if (token) {
			router.push("/");
		}
	}, []);

	return (
		<div className="w-screen h-screen flex">
			<div className="justify-center items-center w-1/2 hidden md:flex">
				<img
					src={"/images/login_image.png"}
					className="w-2/3"
				/>
			</div>
			<div className="flex flex-col justify-center items-center w-full md:w-1/2 ">
				<Title text={"Welcome HR!"} />
				<form
					className="flex flex-col gap-4 text-center"
					onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col">
						<label
							htmlFor="email"
							className="text-left">
							Email :
						</label>
						<input
							type="text"
							placeholder="Email"
							id="email"
							{...register("email")}
						/>
					</div>
					<div className="flex flex-col">
						<label
							htmlFor="password"
							className="text-left">
							Password :
						</label>
						<input
							type="password"
							placeholder="Password"
							id="password"
							{...register("password")}
						/>
					</div>
					<div className="text-[#EC242C] h-6">
						{errors.password && errors.password.message}
					</div>
					<Button
						text={"Login"}
						type="submit"
						buttonFunction={handleSubmit(onSubmit)}
					/>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
