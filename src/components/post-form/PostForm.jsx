import { useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import appwriteService from '../../appwrite/config'
import { Button, Input, RTE, Select } from '../index'

function PostForm({ post }) {
	const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
		defaultValues: {
			title: post?.title || '',
			slug: post?.slug || '',
			content: post?.content || '',
			status: post?.status || 'active',
		},
	})

	const navigate = useNavigate()
	const userData = useSelector(state => state.auth.userData)

	const submit = async (data) => {
		// UPDATE
		if (post) {
			const file = data.image?.[0]
				? await appwriteService.uploadFile(data.image[0])
				: null

			const dbPost = await appwriteService.updatePost(post.$id, {
				...data,
				featuredImage: file ? file.$id : post.featuredImage, // ✅ keep old if no new image
			})

			// delete old image only if update success + new image uploaded
			if (dbPost && file) {
				await appwriteService.deleteFile(post.featuredImage)
			}

			if (dbPost) {
				navigate(`/post/${dbPost.slug}`)
			}

			// CREATE
		} else {
			const file = await appwriteService.uploadFile(data.image[0])

			if (file) {
				const dbPost = await appwriteService.createPost({
					...data,
					featuredImage: file.$id,
					userId: userData.$id,
				})

				if (dbPost) {
					navigate(`/post/${dbPost.slug}`)
				}
			}
		}
	}


	const slugTransform = useCallback((value) => {
		if (value && typeof value === 'string')
			return value
				?.trim()
				.toLowerCase()
				.replace(/[^a-z0-9\s-]/g, "")
				.replace(/\s+/g, "-")
				.replace(/-+/g, "-")
				.replace(/^-+/, "")
				.slice(0, 36);
		return ''
	}, [])

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name === 'title') {
				setValue('slug', slugTransform(value.title),
					{ shouldValidate: true })
			}
		})

		return () => {
			subscription.unsubscribe()
		}
	}, [watch, slugTransform, setValue])

	return (
		<form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
			{/* Main Content Section - Left Side */}
			<div className="w-full lg:w-2/3 px-2 mb-6 lg:mb-0">
				{/* Post Details Card */}
				<div className="bg-gray-800/50 rounded-lg p-4 sm:p-6 mb-6 border border-gray-700/50">
					<h3 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
						<svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
						</svg>
						Post Details
					</h3>

					<div className="space-y-4">
						<Input
							label="Title"
							placeholder="Enter your post title..."
							className="mb-4"
							{...register("title", { required: true })}
						/>

						<Input
							label="Slug"
							placeholder="post-url-slug"
							className="mb-0"
							{...register("slug", { required: true })}
							onInput={(e) => {
								setValue("slug", slugTransform(e.currentTarget.value), {
									shouldValidate: true
								});
							}}
						/>
					</div>
				</div>

				{/* Content Card */}
				<div className="bg-gray-800/50 rounded-lg p-4 sm:p-6 border border-gray-700/50">
					<h3 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
						<svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
						</svg>
						Content
					</h3>
					<RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
				</div>
			</div>

			{/* Sidebar Section - Right Side */}
			<div className="w-full lg:w-1/3 px-2 space-y-6">
				{/* Featured Image Card */}
				<div className="bg-gray-800/50 rounded-lg p-4 sm:p-6 border border-gray-700/50">
					<h3 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
						<svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
						</svg>
						Featured Image
					</h3>

					<Input
						label="Upload Image"
						type="file"
						className="mb-4"
						accept="image/png, image/jpg, image/jpeg, image/gif"
						{...register("image", { required: !post })}
					/>

					{post && (
						<div className="mt-4 rounded-lg overflow-hidden border border-gray-700">
							<img
								src={appwriteService.getFilePreview(post.featuredImage)}
								alt={post.title}
								className="w-full h-auto"
							/>
						</div>
					)}
				</div>

				{/* Settings Card */}
				<div className="bg-gray-800/50 rounded-lg p-4 sm:p-6 border border-gray-700/50">
					<h3 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
						<svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
						</svg>
						Settings
					</h3>

					<Select
						options={["active", "inactive"]}
						label="Status"
						className="mb-4"
						{...register("status", { required: true })}
					/>

					<Button
						type="submit"
						bgColor={post ? "bg-green-500" : undefined}
						className="w-full mt-2"
					>
						{post ? "Update" : "Submit"}
					</Button>
				</div>
			</div>
		</form>
	)
}

export default PostForm
