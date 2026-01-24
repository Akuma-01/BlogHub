export default function Logo({ width = '100px' }) {
	return (
		<div style={{ width }} className="flex items-center gap-2.5">
			<div className="relative">
				<div className="w-9 h-9 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:rotate-6">
					<span className="text-white font-bold text-lg">B</span>
				</div>
				<div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
			</div>
			<span className="text-white font-bold text-xl tracking-tight">BlogHub</span>
		</div>
	)
}
