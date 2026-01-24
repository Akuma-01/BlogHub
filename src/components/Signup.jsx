import { useState } from "react"
import { useForm } from 'react-hook-form'
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index'

function Signup() {
	const navigate = useNavigate()
	const [error, setError] = useState("")
	const dispatch = useDispatch()
	const { register, handleSubmit } = useForm()

	const create = async (data) => {
		setError("")
		try {
			const userData = await authService.createAccount(data)
			if (userData) {
				const userData = await authService.getCurrentUser()
				if (userData) dispatch(login(userData));
				navigate("/")
			}
		} catch (error) {
			setError(error.message)
		}
	}
	return (
		<div className="flex items-center justify-center w-full h-[85vh] bg-slate-900 px-4">
			<div className="mx-auto w-full max-w-md">
				<div className="bg-slate-800 rounded-2xl p-6 shadow-2xl border border-slate-700">
					<div className="mb-4 flex justify-center">
						<span className="inline-block w-full max-w-37.5">
							<Logo width="100%" />
						</span>
					</div>

					<div className="text-center mb-6">
						<h2 className="text-2xl font-bold text-white mb-1">
							Create Account
						</h2>
						<p className="text-slate-400 text-sm">
							Join our community today
						</p>
					</div>

					{error && (
						<div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
							<p className="text-red-400 text-sm text-center">{error}</p>
						</div>
					)}

					<form onSubmit={handleSubmit(create)} className="space-y-5">
						<Input
							label="Full Name"
							autoFocus
							placeholder="Enter your full name"
							{...register("name", {
								required: true,
							})}
						/>
						<Input
							label="Email"
							placeholder="Enter your email"
							type="email"
							{...register("email", {
								required: true,
								validate: {
									matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.
										test(value) ||
										"Email address must be a valid address",

								}
							})}
						/>
						<Input
							label="Password"
							type="password"
							placeholder="Enter your password"
							{...register("password", {
								required: true,
							})}
						/>
						<Button type="submit" className="w-full">
							Create Account
						</Button>
					</form>

					<div className="mt-6 text-center">
						<p className="text-slate-400 text-sm">
							Already have an account?{" "}
							<Link
								to="/login"
								className="font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200"
							>
								Sign In
							</Link>
						</p>
					</div>
				</div>

				<p className="text-center text-slate-500 text-xs mt-6">
					By creating an account, you agree to our Terms of Service and Privacy Policy
				</p>
			</div>
		</div>
	)
}

export default Signup
