
import { ContentService } from "@/services/contentService";
import { Children } from "react";

export default async function DynamicPage() {
    const result = await ContentService.getContent(language, props.params.args, addStartItemHeader ? currentRootUrl : null, adminToken);
    const ancestors = await ContentService.getAncestors(language, props.params.args, addStartItemHeader ? currentRootUrl : null, adminToken);
    var links: LinkModel[] = (ancestors.items ?? []).map((item: any) => {
        return { url: item.route.path, target: '', title: item.properties.title ? item.properties.title : item.name }
    })
    if (result != undefined) {
        const { contentType: pageType, properties: data } = result

        if (data && pageType) {


            return (<>
            </>
            );
        }
        return <div>Unknown Page Type</div>
    }
}