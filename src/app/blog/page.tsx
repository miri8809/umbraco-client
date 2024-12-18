'use client'
import { useState, useEffect } from "react";
import { ContentService } from "@/services/content-service";
import Link from "next/link";

const DynamicPage: React.FC<{}> = () => {
    const [pageIndex, setPageIndex] = useState(0);
    const [posts, setPosts] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const result = await ContentService.getBlog(5, pageIndex);
                if (result) {
                    setPosts(result.items);
                } else {
                    setError("Failed to fetch content");
                }
            } catch (err) {
                setError("Failed to fetch content");
            }
        };

        fetchPosts();
    }, [pageIndex]);

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

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            {posts.map((post: any, index: number) => {
                let stripedText;
                if (post.properties.bodyContent) {
                    stripedText = stripHtml(post.properties.bodyContent.markup);
                }
                return (
                    <Link href={'blog/' + post.id} key={index}>
                        <h1>{post.properties.title}</h1>
                        <div>
                            {stripedText ? (stripedText.length > 200 ? stripedText.substring(0, 200) + '...' : stripedText) : ''}
                        </div>
                    </Link>
                );
            })}
            <div>
                <button onClick={handlePreviousPage} disabled={pageIndex === 0}>Previous</button>
                <button onClick={handleNextPage}>Next</button>
            </div>
        </>
    );
};

export default DynamicPage;