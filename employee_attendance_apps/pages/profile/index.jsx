import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import Layout from "../../components/layout";
import { apiEmployeeLogin } from "../../api";
import Title from "../../components/text/title";
import Button from "../../components/button";

const Profile = () => {
	const router = useRouter();
	const [dataLogin, setDataLogin] = useState(null);

	const [dataProfile, setDataProfile] = useState(null);

	const getProfile = async () => {
		try {
			const { data } = await apiEmployeeLogin({
				method: "get",
				url: "/employee/my_profile",
				headers: {
					Authorization: "Bearer " + dataLogin.access_token,
				},
			});
			setDataProfile(data);
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
		getProfile();
	}, [dataLogin]);

	return (
		<Layout>
			<Title text={"My Profile"} />
			<div className="flex flex-col md:flex-row gap-6 items-end md:items-start">
				<div className="flex flex-col md:flex-row w-full md:w-fit border-2 border-[#5EC8F2] rounded-md gap-10 items-center p-4">
					<div className="bg-[#5EC8F2]/40 rounded-full">
						{dataProfile && dataProfile.photo_profile ? (
							<img
								className="w-32 h-32 rounded-full"
								src={`data:image/png;base64, ${dataProfile.photo_profile}`}
							/>
						) : (
							<img
								className="w-32 h-32 rounded-full"
								src={"/images/default_profile.png"}
							/>
						)}
					</div>
					<div className="flex flex-col gap-4">
						<div>First Name : {dataProfile ? dataProfile.first_name : "-"}</div>
						<div>Last Name : {dataProfile ? dataProfile.last_name : "-"}</div>
						<div>Email : {dataProfile ? dataProfile.email : "-"}</div>
						<div>Position: {dataProfile ? dataProfile.Position.name : "-"}</div>
						<div>
							Phone Number : {dataProfile ? dataProfile.phone_number : "-"}
						</div>
					</div>
				</div>
				<div className="flex flex-row md:flex-col gap-6">
					<Button
						text={"Edit"}
						buttonFunction={() =>
							router.push({
								pathname: "/profile/edit",
								query: { phone_number: dataProfile.phone_number },
							})
						}
					/>
					<Button
						text={"Change Password"}
						buttonFunction={() => router.push("/profile/password")}
					/>
				</div>
			</div>
		</Layout>
	);
};

export default Profile;
