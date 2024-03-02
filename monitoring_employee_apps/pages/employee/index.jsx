import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import Layout from "../../components/layout";
import Title from "../../components/text/title";
import Button from "../../components/button";

import { apiEmployeeLogin } from "../../../employee_attendance_apps/api";

const Employee = () => {
	const router = useRouter();
	const [dataLogin, setDataLogin] = useState(null);

	const [employee, setEmployee] = useState(null);

	const getDataEmployee = async () => {
		try {
			const { data } = await apiEmployeeLogin({
				method: "get",
				url: "/employee/all_profile",
				headers: {
					Authorization: "Bearer " + dataLogin.access_token,
				},
			});
			setEmployee(data);
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

		getDataEmployee();
	}, [dataLogin]);

	return (
		<Layout>
			<Title text={"Employees Data"} />

			<div className="w-full flex flex-col gap-10">
				<div className="self-end">
					<Button
						text={"Add Employee"}
						buttonFunction={() => router.push("/employee/add")}
					/>
				</div>
				<div>
					{employee && employee.length > 0 && (
						<div>
							<table className="hidden lg:inline-table">
								<thead>
									<tr>
										<th>No.</th>
										<th>Profile</th>
										<th>Name</th>
										<th>Email</th>
										<th>Position</th>
										<th>Phone Number</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{employee &&
										employee.length > 0 &&
										employee.map((el, idx) => (
											<tr key={el.id}>
												<td>
													<div>{idx + 1}.</div>
												</td>
												<td>
													<div className="w-full flex justify-center">
														<img
															className="w-16 h-16 rounded-full"
															src={
																el.photo_profile
																	? `data:image/png;base64, ${el.photo_profile}`
																	: "/images/default_profile.png"
															}
														/>
													</div>
												</td>
												<td>{`${el.first_name} ${el.last_name}`}</td>
												<td>{`${el.email}`}</td>
												<td>{`${el.Position.name}`}</td>
												<td>{`${el.phone_number}`}</td>
												<td>
													<div className="flex justify-center">
														<Button
															text={"Edit"}
															buttonFunction={() =>
																router.push(`/employee/edit/${el.id}`)
															}
														/>
													</div>
												</td>
											</tr>
										))}
								</tbody>
							</table>
							<div className="flex flex-col gap-6 lg:hidden">
								{employee.map((el, idx) => (
									<div
										className="border border-[#5EC8F2] rounded-lg w-full flex flex-col md:flex-row items-center justify-between p-4"
										key={`${el.id}${idx}`}>
										<div className="md:w-1/2 flex justify-center">
											<img
												className="w-32 h-32 rounded-full"
												src={
													el.photo_profile
														? `data:image/png;base64, ${el.photo_profile}`
														: "/images/default_profile.png"
												}
											/>
										</div>
										<div className="flex flex-col gap-4 w-full md:w-1/2">
											<div>No: {idx + 1}.</div>
											<div className="text-ellipsis overflow-hidden w-full">
												Name: {`${el.first_name} ${el.last_name}`}
											</div>
											<div className="text-ellipsis overflow-hidden w-full">
												Email: {el.email}
											</div>
											<div className="text-ellipsis overflow-hidden w-full">
												Position: {el.Position.name}
											</div>
											<div className="text-ellipsis overflow-hidden w-full">
												Phone Number: {el.phone_number}
											</div>
											<div className="self-end">
												<Button
													text={"Edit"}
													buttonFunction={() =>
														router.push(`/employee/edit/${el.id}`)
													}
												/>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default Employee;
