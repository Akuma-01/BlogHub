import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Logo, LogoutBtn } from '../index';

export default function Header() {
	const authStatus = useSelector((state) => state.auth.status);
	const navigate = useNavigate();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

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
	];

	const handleNavClick = (slug) => {
		navigate(slug);
		setIsMenuOpen(false);
	};

	return (
		<header className="py-3 shadow bg-gray-900 relative">
			<Container>
				<nav className="flex items-center justify-between relative">
					<div className="flex items-center">
						<Link to="/">
							<Logo width="70px" />
						</Link>
					</div>

					{/* Mobile menu button */}
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="md:hidden text-slate-300 hover:text-white focus:outline-none p-2"
						aria-label="Toggle menu"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							{isMenuOpen ? (
								<path d="M6 18L18 6M6 6l12 12" />
							) : (
								<path d="M4 6h16M4 12h16M4 18h16" />
							)}
						</svg>
					</button>

					{/* Desktop menu */}
					<ul className="hidden md:flex ml-auto items-center space-x-2">
						{navItems.map((item) =>
							item.active ? (
								<li key={item.name}>
									<button
										onClick={() => navigate(item.slug)}
										className="relative inline-block px-5 py-2 duration-200 text-slate-300 hover:text-white font-medium transition-colors group"
									>
										{item.name}
										<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
									</button>
								</li>
							) : null
						)}
						{authStatus && (
							<li>
								<LogoutBtn />
							</li>
						)}
					</ul>

				</nav>

				{/* Mobile menu */}
				{isMenuOpen && (
					<div className="md:hidden bg-gray-800 mt-3 rounded-lg shadow-lg border border-gray-700">
						<ul className="flex flex-col py-2">
							{navItems.map((item) =>
								item.active ? (
									<li key={item.name}>
										<button
											onClick={() => handleNavClick(item.slug)}
											className="w-full text-left px-6 py-3 text-slate-300 hover:text-white hover:bg-gray-700 font-medium transition-colors"
										>
											{item.name}
										</button>
									</li>
								) : null
							)}
							{authStatus && (
								<li className="px-6 py-3">
									<LogoutBtn />
								</li>
							)}
						</ul>
					</div>
				)}
			</Container>
		</header>
	);
}
