import { useEffect, useState } from "react"
import authService from "../appwrite/auth"
import appwriteService from "../appwrite/config"
import { Container, PostCard } from "../components"

function Home() {
	const [posts, setPosts] = useState([])
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		authService.getCurrentUser().then(setUser)
	}, [])

	useEffect(() => {
		setLoading(true)
		appwriteService.getPosts().then((posts) => {
			if (posts) {
				setPosts(posts.documents)
			} else {
				setPosts([])
			}
			setLoading(false)
		})
	}, [])

	// ✅ Loading UI
	if (loading) {
		return (
			<div className="w-full min-h-screen bg-slate-900 flex items-center justify-center">
				<p className="text-white text-lg">Loading posts...</p>
			</div>
		)
	}

	if (!loading && posts.length === 0) {
		return (
			<div className="w-full h-[93vh] bg-slate-900 flex items-center justify-center py-20">
				<Container>
					<div className="flex flex-col items-center justify-center space-y-6">
						<div className="relative">
							<div className="w-24 h-24 bg-linear-to-br from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center border-2 border-blue-500/30">
								<svg
									className="w-12 h-12 text-blue-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
									/>
								</svg>
							</div>
							<div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full animate-ping opacity-75"></div>
							<div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full"></div>
						</div>

						<div className="text-center space-y-3">
							<h1 className="text-3xl md:text-4xl font-bold text-white">
								Welcome to BlogHub
							</h1>
							<p className="text-slate-400 text-lg max-w-md mx-auto">
								Discover amazing stories and insights from our community
							</p>
						</div>

						<div className="flex flex-col sm:flex-row gap-4 mt-6">
							{user ? (
								<a
									href="/add-post"
									className="px-8 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
								>
									Add Post
								</a>
							) : (
								<>
									<a
										href="/login"
										className="px-8 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
									>
										Login to Add Posts
									</a>

									<a
										href="/signup"
										className="px-8 py-3 bg-slate-800 text-white font-semibold rounded-lg border border-slate-700 hover:bg-slate-700 hover:border-slate-600 transition-all duration-300"
									>
										Create Account
									</a>
								</>
							)}
						</div>
					</div>
				</Container>
			</div>
		)
	}

	// ✅ Posts exist (show posts for everyone)
	return (
		<div className="w-full min-h-screen bg-slate-900 py-12">
			<Container>

				{!user && (
					<div className="mb-8 p-4 rounded-lg border border-slate-700 bg-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
						<div>
							<h3 className="text-white font-semibold text-lg">
								Want to publish your own post?
							</h3>
							<p className="text-slate-400">
								Login or create an account to start writing.
							</p>
						</div>

						<div className="flex gap-3">
							<a
								href="/login"
								className="px-5 py-2 bg-linear-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg"
							>
								Login
							</a>
							<a
								href="/signup"
								className="px-5 py-2 bg-slate-700 text-white font-semibold rounded-lg border border-slate-600"
							>
								Sign up
							</a>
						</div>
					</div>
				)}

				<div className="mb-8">
					<h2 className="text-3xl font-bold text-white mb-2">Latest Posts</h2>
					<p className="text-slate-400">Explore our latest articles and stories</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{posts.map((post) => (
						<div key={post.$id}>
							<PostCard {...post} />
						</div>
					))}
				</div>
			</Container>
		</div>
	)
}

export default Home
