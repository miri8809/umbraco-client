'use client'
import ComponentData from "@/models/ComponentData"
import PostData from "@/models/PostData"
import { ContentService } from "@/services/content-service"
import Link from "next/link"
import { useEffect, useState } from "react"
import '../assets/styles/blog-page.scss'
import moment from "moment"
const BlogPage: React.FC<ComponentData> = (props) => {
    const [posts, setPosts] = useState<PostData[]>([])
    const [pageIndex, setPageIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTags, setSearchTags] = useState<string[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const result: any = await ContentService.getBlogPosts(searchTags, 5, pageIndex)
            setPosts(result?.items?.map((post: any) => ({
                title: post.properties.title,
                bodyContent: post.properties.bodyContent,
                autherName: post.properties.autherName,
                publishDate: post.properties.publishDate,
                link: post.route.path
            })))
            setTotalPages(Math.ceil(result?.total / 5)); // הנחה שיש שדה totalPages
        }
        fetchData()
    }, [pageIndex, searchTags])

    function stripHtml(html: string) {
        return html.replace(/<[^>]*>/g, '');
    }

    const handlePageChange = (newPageIndex: number) => {
        if (newPageIndex >= 0 && newPageIndex < totalPages) {
            setPageIndex(newPageIndex);
        }
    };

    return <>
        <h1 className="blog-title">{props.data.title}</h1>
        <div className="blog-description" dangerouslySetInnerHTML={{ __html: props.data.description ? props.data.description.markup : '' }}></div>
        {/* example: filter by tags */}
        <input type="text" placeholder="search by tags" onChange={(e) => setSearchTags(e.target.value.split(','))} />
        {posts?.map((post: PostData, index: number) => {
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
                    <p >{post.autherName}</p>
                    <span >{moment(post.publishDate).format('DD-MM-yyyy')}</span>
                </Link>
            );
        })}
        <div className="pagination">
            <button className="pagination-button" onClick={() => handlePageChange(pageIndex - 1)} disabled={pageIndex === 0}>
                הקודם
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
                <button className="pagination-button" key={index} onClick={() => handlePageChange(index)} disabled={index === pageIndex}>
                    {index + 1}
                </button>
            ))}

            <button className="pagination-button" onClick={() => handlePageChange(pageIndex + 1)} disabled={pageIndex === totalPages - 1}>
                הבא
            </button>
        </div>

    </>
}
export default BlogPage
