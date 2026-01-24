import { Link } from 'react-router-dom'
import appwriteService from "../appwrite/config"

function PostCard({ slug, title, featuredImage }) {
	return (
		<Link to={`/post/${slug}`}>
			<div className="group w-full bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 border border-gray-700 hover:border-purple-500">
				<div className="w-full aspect-video overflow-hidden bg-gray-700">
					<img
						src={appwriteService.getFilePreview(featuredImage)}
						alt={title}
						className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
					/>
				</div>
				<div className="p-5">
					<h2 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
						{title}
					</h2>
					<div className="mt-3 flex items-center text-purple-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						Read more
						<svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
						</svg>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default PostCard
