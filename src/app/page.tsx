import { Helper } from "@/common/helper";
import { ContentService } from "@/services/content-service"

const DynamicPage: React.FC = async () => {

    const result = await ContentService.getContent(['/'])
    if (result) {
        const PageToRender: any = Helper.getPageToRender(result.contentType)
        if (PageToRender)
            return <PageToRender data={result.properties} />
    }
    return <>no page type</>
}
export default DynamicPage