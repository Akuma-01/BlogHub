import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

export default function LogoutBtn() {
	const dispatch = useDispatch();
	const logoutHandler = () => {
		authService.logout().then(() => {
			dispatch(logout())
		})
	}

	return (
		<button
			className='relative inline-block px-5 py-2 duration-200 text-slate-300 hover:text-white font-medium transition-colors group'
			onClick={logoutHandler}
		>
			Logout
			<span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300'></span>
		</button>
	)
}
