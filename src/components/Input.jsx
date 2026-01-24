import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
	label,
	type = "text",
	className = "",
	...props
}, ref) {
	const id = useId()
	return (
		<div className='w-full'>
			{label && <label
				className='inline-block mb-2 pl-1 text-slate-200 font-medium text-sm'
				htmlFor={id}>
				{label}
			</label>
			}
			<input type={type}
				className={`px-4 py-3 rounded-lg bg-slate-700 text-white placeholder:text-slate-400 outline-none focus:bg-slate-600 focus:ring-2 focus:ring-blue-500 duration-200 border border-slate-600 w-full ${className}`}
				ref={ref}
				{...props}
				id={id}
			/>
		</div>
	)
})

export default Input
