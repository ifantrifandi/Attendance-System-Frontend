import { useRouter } from "next/router";
import React, { useState } from "react";

const Layout = ({ children }) => {
	const router = useRouter();
	const [isOpenMenu, setIsOpenMenu] = useState(false);

	return (
		<div className="w-screen h-screen">
			<div className="bg-[#5EC8F2] w-full h-20  p-4 text-white hidden md:flex items-center justify-between">
				<a
					className="cursor-pointer"
					href="/">
					Attendance System HR
				</a>
				<div className="flex gap-6">
					<a
						className="cursor-pointer"
						href="/employee">
						Employee
					</a>
					<a
						className="cursor-pointer"
						href="/attendances-employee">
						Attendances Employee
					</a>
					<div
						className="cursor-pointer"
						onClick={() => {
							localStorage.removeItem("dataLoginHr");

							router.push("/login");
						}}>
						Logout
					</div>
				</div>
			</div>
			<div className="bg-[#5EC8F2] w-full h-16 p-4 text-white flex items-center justify-between md:hidden relative top-0">
				<a
					className="cursor-pointer"
					href="/">
					Attendance System
				</a>
				<img
					className="h-10 cursor-pointer"
					src={"/images/burger-icon-menu.jpg"}
					onClick={() => setIsOpenMenu(!isOpenMenu)}
				/>
				{isOpenMenu && (
					<div className="absolute top-[62px] h-fit w-full bg-[#5EC8F2] left-0 rounded-b-sm">
						<div className="flex flex-col gap-6 p-4">
							<a
								className="cursor-pointer"
								href="/employee">
								Employee
							</a>
							<a
								className="cursor-pointer"
								href="/attendances-employee">
								Attendances Employee
							</a>
							<div
								className="cursor-pointer"
								onClick={() => {
									localStorage.removeItem("dataLoginHr");

									router.push("/login");
								}}>
								Logout
							</div>
						</div>
					</div>
				)}
			</div>
			<div className="p-10 md:p-20">{children}</div>
		</div>
	);
};

export default Layout;
