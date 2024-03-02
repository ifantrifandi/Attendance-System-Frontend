import React from "react";

const ButtonEllipse = ({ text, buttonFunction }) => {
	return (
		<div
			onClick={() => buttonFunction()}
			className="flex justify-center items-center border border-solid border-[#5EC8F2]
       rounded-full text-[#5EC8F2] hover:text-white hover:bg-[#5EC8F2] px-2 text-center w-24 h-24 cursor-pointer">
			{text}
		</div>
	);
};

export default ButtonEllipse;
