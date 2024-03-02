import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import Layout from "../../../components/layout";
import Title from "../../../components/text/title";
import { apiEmployeeLogin } from "../../../api";
import Button from "../../../components/button";

const EditProfile = () => {
	const [dataLogin, setDataLogin] = useState(null);

	const router = useRouter();
	const {
		register,
		handleSubmit,
		setError,
		setValue,
		formState: { errors },
	} = useForm({});

	const { phone_number } = router.query;

	const editProfile = async (dataForm) => {
		try {
			const formData = new FormData();
			formData.append("phone_number", dataForm.phone_number);
			if (dataForm.photo_profile[0]) {
				formData.append("photo_profile", dataForm.photo_profile[0]);
			}

			const { data } = await apiEmployeeLogin({
				method: "put",
				url: `/employee/update/profile/${dataLogin.id}`,
				headers: {
					Authorization: "Bearer " + dataLogin.access_token,
					"Content-Type": "multipart/form-data",
					Accept: "application/json",
				},
				data: formData,
			});

			toast.success("success update profile", {
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
				toast.error(err.response.data.message, {
					position: "top-center",
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					theme: "colored",
				});
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

	useEffect(() => {
		setValue("phone_number", phone_number);
	}, [phone_number]);

	useEffect(() => {
		const token = localStorage.getItem("dataLogin");

		if (!token) {
			router.push("/login");
		}

		setDataLogin(JSON.parse(token));
	}, []);

	return (
		<Layout>
			<Title text={"Edit Profile"} />
			<form
				className="flex flex-col gap-4 w-full md:w-60"
				onSubmit={handleSubmit(editProfile)}>
				<div className="w-full md:w-60">
					<label htmlFor="photo_profile">Photo Profile</label>
					<input
						id="photo_profile"
						{...register("photo_profile")}
						type="file"
						accept="image/png, image/jpeg, image/jpg"
					/>
				</div>
				<div className="w-full md:w-60">
					<label htmlFor="phone_number">Phone Number</label>
					<input
						id="phone_number"
						{...register("phone_number")}
						type="text"
					/>
				</div>
				<Button
					text="Submit"
					buttonFunction={() => handleSubmit(editProfile)}
				/>
			</form>
		</Layout>
	);
};

export default EditProfile;
