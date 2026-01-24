import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<footer className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700">
			<div className="mx-auto w-full max-w-screen-xl p-4 py-8 lg:py-12">
				<div className="flex flex-col items-center justify-center mt-4 space-y-4">
					<Link
						to="https://github.com/Akuma-01"
						className="group flex items-center gap-3 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 border border-gray-700 hover:border-gray-600 shadow-lg hover:shadow-xl"
					>
						<svg
							className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
							Akuma-01
						</span>
						<span className="sr-only">GitHub account</span>
					</Link>

					<div className="text-xs text-gray-500 text-center pt-4">
						© {new Date().getFullYear()} All rights reserved
					</div>
				</div>
			</div>
		</footer>
	);
}
