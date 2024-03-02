import React from "react";

const Button = ({ text, buttonFunction, type, wFull = false }) => {
	return (
		<button
			type={type ? type : null}
			onClick={(e) => {
				e.preventDefault();
				buttonFunction();
			}}
			onSubmit={(e) => {
				e.preventDefault();
				buttonFunction();
			}}
			value={type ? type : null}
			className={`border border-solid border-[#5EC8F2] rounded text-[#5EC8F2] hover:text-white hover:bg-[#5EC8F2] p-2 text-center cursor-pointer ${
				wFull ? "w-full" : ""
			}`}>
			{text}
		</button>
	);
};

export default Button;
