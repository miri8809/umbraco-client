'use client'
import ComponentData from "@/models/ComponentData"
import PostData from "@/models/PostData"
import { ContentService } from "@/services/content-service"
import Link from "next/link"
import { useEffect, useState } from "react"

const BlogPage: React.FC<ComponentData> = (props) => {
    const [posts, setPosts] = useState<PostData[]>([])
    const [pageIndex, setPageIndex] = useState(0);
    const [searchTags, setSearchTags] = useState<string[]>([])
    useEffect(() => {
        const fetchData = async () => {
            var result: any = ContentService.getBlogPosts(searchTags, 5, pageIndex)
            setPosts(result.items.map((post: any) => {
                return {
                    title: post.properties.title,
                    bodyContent: post.properties.bodyContent,
                    autherName: post.properties.autherName,
                    publishDate: post.properties.publishDate,
                    link: post.properties.route.path
                }
            }))
        }
        fetchData()
    }, [])
    function stripHtml(html: string) {
        const text = html.replace(/<[^>]*>/g, '');
        return text;
    }

    const handleNextPage = () => {
        setPageIndex((prevIndex) => prevIndex + 1);
    };

    const handlePreviousPage = () => {
        setPageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };
    return <>
        <h1 className="blog-title">{props.data.title}</h1>
        <p className="blog-description">{props.data.description}</p>
        <select>
            <option></option>
        </select>
        {posts.map((post: PostData, index: number) => {
            let stripedText;
            if (post.bodyContent) {
                stripedText = stripHtml(post.bodyContent.markup);
            }
            return (
                <Link href={post.link} key={index} className="wrap-post">
                    <h1 className="post-title">{post.title}</h1>
                    <div className="blog-description">
                        {stripedText ? (stripedText.length > 200 ? stripedText.substring(0, 200) + '...' : stripedText) : ''}
                    </div>
                </Link>
            );
        })}
        <div>
            <button className="pagination-button" onClick={handlePreviousPage} disabled={pageIndex === 0}>Previous</button>
            <button className="pagination-button" onClick={handleNextPage}>Next</button>
        </div>
    </>
}
export default BlogPage