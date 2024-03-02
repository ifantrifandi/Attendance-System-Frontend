import React from "react";
import { Controller } from "react-hook-form";
import Button from "../../../button";

const AddOrEditEmployee = ({ position, control, register, submitFunction }) => {
	return (
		<form
			onSubmit={submitFunction}
			className="flex flex-col gap-6 w-full md:w-60">
			<div className="w-full">
				<label htmlFor="first_name">First Name</label>
				<Controller
					render={({ field: { value } }) => (
						<input
							type="text"
							id="first_name"
							value={value}
							{...register("first_name", {
								required: true,
							})}
						/>
					)}
					name="first_name"
					control={control}
				/>
			</div>
			<div className="w-full">
				<label htmlFor="last_name">Last Name</label>
				<Controller
					render={({ field: { value } }) => (
						<input
							type="text"
							id="last_name"
							value={value}
							{...register("last_name")}
						/>
					)}
					name="last_name"
					control={control}
				/>
			</div>
			<div className="w-full">
				<label htmlFor="email">Email</label>
				<Controller
					render={({ field: { value } }) => (
						<input
							type="email"
							id="email"
							value={value}
							{...register("email", {
								required: true,
							})}
						/>
					)}
					name="email"
					control={control}
				/>
			</div>
			<div className="w-full">
				<label htmlFor="phone_number">Phone Number</label>
				<Controller
					render={({ field: { value } }) => (
						<input
							type="text"
							id="phone_number"
							value={value}
							{...register("phone_number", {
								required: true,
							})}
						/>
					)}
					name="phone_number"
					control={control}
				/>
			</div>
			<div className="w-full">
				<label htmlFor="position_id">Position</label>
				<Controller
					render={({ field: { value } }) => (
						<select
							id="position_id"
							name="position_id"
							value={value}
							{...register("position_id", {
								required: true,
							})}>
							{position &&
								position.map((el) => (
									<option
										key={el.id}
										value={el.id}>
										{el.name}
									</option>
								))}
						</select>
					)}
					name="position_id"
					control={control}
				/>
			</div>
			<div className="w-full">
				<Button
					text={"submit"}
					buttonFunction={submitFunction}
					wFull={true}
				/>
			</div>
		</form>
	);
};

export default AddOrEditEmployee;
