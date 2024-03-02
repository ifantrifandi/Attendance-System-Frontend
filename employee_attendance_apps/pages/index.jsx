import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import moment from "moment/moment";
import { toast } from "react-toastify";

import { apiAbsenceLogin } from "../api";

import ButtonEllipse from "../components/button/ellipse";
import Layout from "../components/layout";
import Title from "../components/text/title";

export default function Home() {
	const router = useRouter();
	const [dataLogin, setDataLogin] = useState(null);

	const [absenceToday, setAbsenceToday] = useState(null);

	const getAttendanceToday = async () => {
		try {
			const { data } = await apiAbsenceLogin({
				method: "get",
				url: "/absence/my_absence_today",
				headers: {
					Authorization: "Bearer " + dataLogin.access_token,
					"Content-Type": "application/json",
				},
			});
			setAbsenceToday(data);
		} catch (err) {}
	};

	const submitAttendance = async () => {
		try {
			const { data } = await apiAbsenceLogin({
				method: "post",
				url: "/absence",
				headers: {
					Authorization: "Bearer " + dataLogin.access_token,
					"Content-Type": "application/json",
				},
			});

			setAbsenceToday(data);
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

		getAttendanceToday();
	}, [dataLogin]);

	return (
		<Layout>
			{dataLogin && (
				<>
					<Title text={`Welcome ${dataLogin.first_name}`} />

					<div className="flex flex-col md:flex-row gap-6 w-full items-center text-center md:text-left ">
						<div className="flex flex-col gap-6">
							<div>Today's Date : {moment().format("DD MMM YYYY")}</div>
							<div>
								Clock In :
								{absenceToday && absenceToday.clock_in
									? moment(new Date(absenceToday.clock_in)).format("HH:mm:ss")
									: "-"}{" "}
							</div>
							<div>
								Clock Out:{" "}
								{absenceToday && absenceToday.clock_out
									? moment(new Date(absenceToday.clock_out)).format("HH:mm:ss")
									: "-"}{" "}
							</div>
						</div>

						<ButtonEllipse
							text={"Attendance"}
							buttonFunction={submitAttendance}
						/>
					</div>
				</>
			)}
		</Layout>
	);
}
