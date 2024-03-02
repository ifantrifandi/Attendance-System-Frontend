import React, { useState, useEffect } from "react";
import moment from "moment";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Layout from "../../components/layout";
import { apiAbsenceLogin, apiEmployeeLogin } from "../../api";
import Title from "../../components/text/title";

const AttendancesEmployee = () => {
	const [attendance, setAttendance] = useState([]);
	const [dataLogin, setDataLogin] = useState(null);
	const [employee, setEmployee] = useState([]);

	const { register, watch } = useForm({
		start_date: moment(new Date()).startOf("month").format("YYYY-MM-DD"),
		end_date: moment(new Date()).format("YYYY-MM-DD"),
	});

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

	const getAttendance = async () => {
		try {
			const { data } = await apiAbsenceLogin({
				method: "get",
				url: "/absence/all_absence",
				headers: {
					Authorization: "Bearer " + dataLogin.access_token,
				},
				params: {
					start_date: watch("start_date"),
					end_date: watch("end_date"),
				},
			});
			setAttendance(data);
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
		getAttendance();
	}, [dataLogin]);

	useEffect(() => {
		if (!dataLogin) {
			return;
		}

		getAttendance();
	}, [watch("start_date"), watch("end_date")]);

	return (
		<Layout>
			<Title text={"Employee Attendances"} />

			<div className="flex flex-col md:flex-row gap-6 mb-6">
				<div className="flex flex-col w-full md:w-60">
					<label htmlFor="start_date">Start Date</label>
					<input
						type="date"
						id="start_date"
						className="w-full"
						{...register("start_date")}
					/>
				</div>

				<div className="flex flex-col w-full md:w-60">
					<label htmlFor="end_date">End Date</label>
					<input
						type="date"
						id="end_date"
						className="w-full"
						{...register("end_date")}
					/>
				</div>
			</div>
			{attendance.length > 0 ? (
				<div className="w-full">
					<table
						suppressHydrationWarning={true}
						className="hidden lg:inline-table text-center">
						<thead>
							<tr>
								<th>Attendance Date</th>
								<th>Employee Name</th>
								<th>Employee Email</th>
								<th>Employee Position</th>
								<th>Clock In</th>
								<th>Clock Out</th>
							</tr>
						</thead>
						<tbody
							className="relative"
							suppressHydrationWarning={true}>
							{attendance.map((el) => (
								<tr key={el.id}>
									<td>{moment(el.absence_date).format("DD MMMM YYYY")}</td>
									<td>
										{employee.filter((emp) => el.employee_id == emp.id).length >
										0
											? `${
													employee.filter((emp) => el.employee_id == emp.id)[0]
														.first_name
											  } ${
													employee.filter((emp) => el.employee_id == emp.id)[0]
														.last_name
											  }`
											: "-"}
									</td>
									<td>
										{employee.filter((emp) => el.employee_id == emp.id).length >
										0
											? `${
													employee.filter((emp) => el.employee_id == emp.id)[0]
														.email
											  }`
											: "-"}
									</td>
									<td>
										{employee.filter((emp) => el.employee_id == emp.id).length >
										0
											? `${
													employee.filter((emp) => el.employee_id == emp.id)[0]
														.Position.name
											  }`
											: "-"}
									</td>
									<td>
										{el.clock_in ? moment(el.clock_in).format("HH:mm:ss") : "-"}
									</td>
									<td>
										{el.clock_out
											? moment(el.clock_out).format("HH:mm:ss")
											: "-"}
									</td>
								</tr>
							))}
						</tbody>
					</table>

					<div className="flex flex-col gap-6 lg:hidden">
						{attendance.map((el, idx) => (
							<div
								className="flex flex-col gap-4 border border-[#5EC8F2] w-full h-fit p-4 rounded-lg"
								key={`${el.id}${idx}`}>
								<div>
									Attendance Date:{" "}
									{moment(el.absence_date).format("DD MMMM YYYY")}
								</div>
								<div className="text-ellipsis overflow-hidden">
									Employee Name:{" "}
									{employee.filter((emp) => el.employee_id == emp.id).length > 0
										? `${
												employee.filter((emp) => el.employee_id == emp.id)[0]
													.first_name
										  } ${
												employee.filter((emp) => el.employee_id == emp.id)[0]
													.last_name
										  }`
										: "-"}
								</div>
								<div className="text-ellipsis overflow-hidden">
									Employee Email:{" "}
									{employee.filter((emp) => el.employee_id == emp.id).length > 0
										? `${
												employee.filter((emp) => el.employee_id == emp.id)[0]
													.email
										  }`
										: "-"}
								</div>
								<div className="text-ellipsis overflow-hidden">
									Employee Position:{" "}
									{employee.filter((emp) => el.employee_id == emp.id).length > 0
										? `${
												employee.filter((emp) => el.employee_id == emp.id)[0]
													.Position.name
										  }`
										: "-"}
								</div>
								<div>
									Clock In:{" "}
									{el.clock_in ? moment(el.clock_in).format("HH:mm:ss") : "-"}
								</div>
								<div>
									Clock Out:{" "}
									{el.clock_out ? moment(el.clock_out).format("HH:mm:ss") : "-"}
								</div>
							</div>
						))}
					</div>
				</div>
			) : (
				<div className="w-full md:w-80 h-40 rounded-lg flex justify-center items-center border border-[#5EC8F2]">
					No Attendaces
				</div>
			)}
		</Layout>
	);
};

export default AttendancesEmployee;
