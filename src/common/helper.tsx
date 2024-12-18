import pageMap from "@/models/PagesMap"

const Helper = {
    getPageToRender: (pageType: string) => {
        return pageMap[pageType];
    }
}
export { Helper }