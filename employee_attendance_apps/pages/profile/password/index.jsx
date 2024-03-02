import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Layout from "../../../components/layout";
import Title from "../../../components/text/title";
import Button from "../../../components/button";
import { apiEmployeeLogin } from "../../../api";

const ChangePassword = () => {
	const [dataLogin, setDataLogin] = useState(null);

	const router = useRouter();

	const editPassword = async (dataForm) => {
		try {
			const { data } = await apiEmployeeLogin({
				method: "put",
				url: "/employee/update/password",
				headers: {
					Authorization: "Bearer " + dataLogin.access_token,
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				data: {
					old_password: dataForm.old_password,
					new_password: dataForm.new_password,
				},
			});

			toast.success("success update password", {
				position: "top-right",
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: "colored",
			});

			router.push("/profile");
		} catch (err) {
			if (err.response && err.response.data) {
				setError("old_password", { message: err.response.data.message });
			} else {
				toast.error(err.message, {
					position: "top-center",
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					theme: "colored",
				});
			}
		}
	};

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({});

	useEffect(() => {
		const token = localStorage.getItem("dataLogin");

		if (!token) {
			router.push("/login");
		}

		setDataLogin(JSON.parse(token));
	}, []);

	return (
		<Layout>
			<Title text={"Change Password"} />
			<form
				className="flex flex-col gap-4 w-full md:w-60"
				onSubmit={handleSubmit(editPassword)}>
				<div className="w-60">
					<label htmlFor="old_password">Old password</label>
					<input
						id="old_password"
						{...register("old_password")}
						type="password"
					/>
				</div>
				<div className="w-60">
					<label htmlFor="new_password">New password</label>
					<input
						id="new_password"
						{...register("new_password")}
						type="password"
					/>
				</div>
				<div className="text-[#EC242C] h-6">
					{errors.old_password && errors.old_password.message}
				</div>
				<Button
					text="Submit"
					buttonFunction={() => handleSubmit(editPassword)}
				/>
			</form>
		</Layout>
	);
};

export default ChangePassword;
