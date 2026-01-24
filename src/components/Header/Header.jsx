import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Logo, LogoutBtn } from '../index';

export default function Header() {
	const authStatus = useSelector((state) => state.auth.status)
	const navigate = useNavigate();

	const navItems = [
		{
			name: 'Home',
			slug: '/',
			active: true,
		},
		{
			name: 'Login',
			slug: '/login',
			active: !authStatus,
		},
		{
			name: 'Signup',
			slug: '/signup',
			active: !authStatus,
		},
		{
			name: 'All Posts',
			slug: '/all-posts',
			active: authStatus,
		},
		{
			name: 'Add Post',
			slug: '/add-post',
			active: authStatus,
		},
	]

	return (
		<header className='sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 shadow-lg'>
			<Container>
				<nav className='flex items-center py-4'>
					<div className='mr-4'>
						<Link to='/' className='block transition-opacity duration-300 hover:opacity-80'>
							<Logo width='70px' />
						</Link>
					</div>
					<ul className='flex ml-auto items-center gap-1'>
						{navItems.map((item) =>
							item.active ? (
								<li key={item.name}>
									<button
										onClick={() => navigate(item.slug)}
										className='relative inline-block px-5 py-2 duration-200 text-slate-300 hover:text-white font-medium transition-colors group'
									>
										{item.name}
										<span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300'></span>
									</button>
								</li>
							) : null
						)}
						{authStatus && (
							<li className='ml-2'>
								<LogoutBtn />
							</li>
						)}
					</ul>
				</nav>
			</Container>
		</header>
	)
}
