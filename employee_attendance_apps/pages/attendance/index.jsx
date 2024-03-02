import React, { useState, useEffect } from "react";
import moment from "moment";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Layout from "../../components/layout";
import Title from "../../components/text/title";

import apiAbsenceLogin from "../../api/api_absence_login";

const Attendance = () => {
	const [attendance, setAttendance] = useState([]);
	const [dataLogin, setDataLogin] = useState(null);

	const { register, watch } = useForm({
		start_date: moment(new Date()).startOf("month").format("YYYY-MM-DD"),
		end_date: moment(new Date()).format("YYYY-MM-DD"),
	});

	const getAttendance = async () => {
		try {
			const { data } = await apiAbsenceLogin({
				method: "get",
				url: "/absence/my_absence",
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
		const token = localStorage.getItem("dataLogin");

		if (!token) {
			router.push("/login");
		}

		setDataLogin(JSON.parse(token));
	}, []);

	useEffect(() => {
		if (!dataLogin) {
			return;
		}

		getAttendance();
	}, [dataLogin]);

	useEffect(() => {
		if (!dataLogin) {
			return;
		}

		getAttendance();
	}, [watch("start_date"), watch("end_date")]);

	return (
		<Layout suppressHydrationWarning={true}>
			<Title text={"My Attendance"} />

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
						className="hidden md:inline-table text-center">
						<thead>
							<tr>
								<th>Attendance Date</th>
								<th>Clock In</th>
								<th>Clock Out</th>
							</tr>
						</thead>
						<tbody
							className="relative"
							suppressHydrationWarning={true}>
							{attendance.map((el) => (
								<tr key={el.absence_date}>
									<td>{moment(el.absence_date).format("DD MMMM YYYY")}</td>
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

					<div className="flex flex-col gap-6 md:hidden">
						{attendance.map((el) => (
							<div className="flex flex-col gap-4 border border-[#5EC8F2] w-full h-fit p-4 rounded-lg">
								<div>
									Attendance Date:{" "}
									{moment(el.absence_date).format("DD MMMM YYYY")}
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

export default Attendance;
