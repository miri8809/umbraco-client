import BlogPage from "@/_pages/blog-page";
import PostPage from "@/_pages/post-page";
import { Helper } from "@/common/helper";
import { ContentService } from "@/services/content-service"

const DynamicPage: React.FC<{ params: { args: string[] } }> = async (props) => {
    const result = await ContentService.getContent(props.params.args)
    if (result) {
        const PageToRender: any = Helper.getPageToRender(result.contentType)
        if (PageToRender)
            return <PageToRender data={result.properties} />
    }
    return <>no page type</>
}
export default DynamicPage