import BlogPage from "@/_pages/blog-page";
import PostPage from "@/_pages/post-page";
import { ContentService } from "@/services/content-service"

const DynamicPage: React.FC<{ params: string[] }> = async (props) => {
    const pageMap:any = {
        blog: BlogPage,
        post: PostPage,
    }
    const result =await ContentService.getContent(props.params)
    if (result) {
        const PageToRender:any = pageMap[result.contentType];
        if(PageToRender)
            return <PageToRender data={result.properties}/>
    }
    return <>no page type</>
}
export default DynamicPage