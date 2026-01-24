import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";


export default function Post() {
	const [post, setPost] = useState(null)
	const { slug } = useParams()
	const navigate = useNavigate();

	const userData = useSelector((state) => state.auth.userData)

	const isAuthor = post && userData ? post.userId == userData.$id : false;

	useEffect(() => {
		if (slug) {
			appwriteService.getPostBySlug(slug).then((post) => {
				if (post) setPost(post);
				else navigate("/");
			})
		} else navigate("/");
	}, [slug, navigate]);

	const deletePost = () => {
		appwriteService.deletePost(post.$id).then((status) => {
			if (status) {
				appwriteService.deleteFile(post.featuredImage);
				navigate("/");
			}
		})
	}

	return post ? (
		<div className="py-8">
			<Container>
				<div className="max-w-4xl mx-auto mb-8">
					<h1 className="text-4xl font-bold text-white mb-2">
						{post.title}
					</h1>


				</div>

				<div className="max-w-4xl mx-auto mb-8">
					<img
						src={appwriteService.getFilePreview(post.featuredImage)}
						alt={post.title}
						className="w-full rounded-lg"
					/>
				</div>

				<div className="max-w-4xl mx-auto">
					<div className="text-gray-300 text-lg leading-relaxed browser-css">
						{parse(post.content)}
					</div>
				</div>
				<div className="max-w-4xl mx-auto mb-8 mt-4 flex justify-center">
					{isAuthor && (
						<div className="flex gap-3 mt-4">
							<Link to={`/edit-post/${slug}`}>
								<Button
									bgColor="bg-green-500"
									className="px-6"
								>
									Edit
								</Button>
							</Link>
							<Button
								bgColor="bg-red-500"
								onClick={deletePost}
								className="px-6"
							>
								Delete
							</Button>
						</div>
					)}
				</div>

			</Container>
		</div>
	) : null;
}
