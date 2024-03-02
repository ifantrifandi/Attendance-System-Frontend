import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import Layout from "../../../components/layout";
import Title from "../../../components/text/title";
import AddOrEditEmployee from "../../../components/pages/employee/add-or-edit";
import { apiEmployeeLogin } from "../../../api";

const AddEmployee = () => {
	const router = useRouter();
	const [dataLogin, setDataLogin] = useState(null);
	const [position, setPosition] = useState([]);

	const { register, handleSubmit, watch, control } = useForm({
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
			phone_number: "",
			position_id: 2,
		},
	});

	const submitFunction = async (formData) => {
		try {
			const { data } = await apiEmployeeLogin({
				method: "post",
				url: "/employee/create/profile",
				data: {
					first_name: formData.first_name,
					last_name: formData.last_name,
					email: formData.email,
					phone_number: formData.phone_number,
					position_id: formData.position_id,
				},
				headers: {
					Authorization: "Bearer " + dataLogin.access_token,
					"Content-Type": "application/json",
				},
			});

			toast.success("success create employee", {
				position: "top-center",
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: "colored",
			});

			router.push("/employee");
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

	const getPosition = async () => {
		try {
			const { data } = await apiEmployeeLogin({
				method: "get",
				url: "/employee/position",
				headers: {
					Authorization: "Bearer " + dataLogin.access_token,
				},
			});
			setPosition(data);
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
		const token = localStorage.getItem("dataLoginHr");

		if (!token) {
			router.push("/login");
		}

		setDataLogin(JSON.parse(token));
	}, []);

	useEffect(() => {
		if (!dataLogin) {
			return;
		}

		getPosition();
	}, [dataLogin]);

	return (
		<Layout>
			<Title text={"Add Employee"} />

			<AddOrEditEmployee
				watch={watch}
				position={position}
				control={control}
				register={register}
				submitFunction={handleSubmit(submitFunction)}
			/>
		</Layout>
	);
};

export default AddEmployee;
