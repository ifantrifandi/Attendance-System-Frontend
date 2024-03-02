import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import moment from "moment/moment";

import { apiAbsenceLogin } from "../api";

import ButtonEllipse from "../components/button/ellipse";
import Layout from "../components/layout";
import Title from "../components/text/title";

export default function Home() {
	const router = useRouter();
	const [dataLogin, setDataLogin] = useState(null);

	const [absenceToday, setAbsenceToday] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("dataLoginHr");

		if (!token) {
			router.push("/login");
		}

		setDataLogin(JSON.parse(token));
	}, []);

	return (
		<Layout>
			{dataLogin && (
				<>
					<Title text={`Welcome ${dataLogin.first_name}`} />

					<div className="flex flex-col md:flex-row gap-6 w-full items-center text-center md:text-left ">
						<div className="flex flex-col gap-6">
							<div>Today's Date : {moment().format("DD MMM YYYY")}</div>
						</div>

						{/* <ButtonEllipse
							text={"Attendance"}
							buttonFunction={submitAttendance}
						/> */}
					</div>
				</>
			)}
		</Layout>
	);
}
