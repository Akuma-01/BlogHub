import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Logo, LogoutBtn } from '../index';

export default function Header() {
	const authStatus = useSelector((state) => state.auth.status);
	const navigate = useNavigate();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuRef = useRef(null);

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
			active: true,
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

	// Close menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setIsMenuOpen(false);
			}
		};

		if (isMenuOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);

	// Close menu on escape key
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape') {
				setIsMenuOpen(false);
			}
		};

		if (isMenuOpen) {
			document.addEventListener('keydown', handleEscape);
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isMenuOpen]);

	return (
		<header className="py-3 shadow bg-gray-900 sticky top-0 z-50">
			<Container>
				<nav className="flex items-center justify-between relative" ref={menuRef}>
					<div className="flex items-center">
						<Link to="/" onClick={() => setIsMenuOpen(false)}>
							<Logo width="70px" />
						</Link>
					</div>

					{/* Mobile menu button */}
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="md:hidden text-slate-300 hover:text-white focus:outline-none p-2 rounded-lg hover:bg-gray-800 transition-colors"
						aria-label="Toggle menu"
						aria-expanded={isMenuOpen}
					>
						<svg
							className="w-6 h-6 transition-transform duration-200"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
							style={{ transform: isMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
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

					{/* Mobile menu dropdown */}
					<div
						className={`
							absolute top-full left-0 right-0 mt-2 md:hidden
							transition-all duration-300 ease-in-out origin-top
							${isMenuOpen
								? 'opacity-100 scale-y-100 visible'
								: 'opacity-0 scale-y-95 invisible'
							}
						`}
					>
						<div className="bg-gray-800 rounded-lg shadow-2xl border border-gray-700 overflow-hidden backdrop-blur-sm">
							<ul className="flex flex-col py-2">
								{navItems.map((item, index) =>
									item.active ? (
										<li
											key={item.name}
											className="animate-slideIn"
											style={{ animationDelay: `${index * 50}ms` }}
										>
											<button
												onClick={() => handleNavClick(item.slug)}
												className="w-full text-left px-6 py-3 text-slate-300 hover:text-white hover:bg-gray-700/70 font-medium transition-all duration-200 flex items-center gap-3 group"
											>
												<span className="w-1 h-1 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
												{item.name}
											</button>
										</li>
									) : null
								)}
								{authStatus && (
									<li className="px-4 py-3 border-t border-gray-700/50 mt-2">
										<LogoutBtn />
									</li>
								)}
							</ul>
						</div>
					</div>
				</nav>
			</Container>
		</header>
	);
}
