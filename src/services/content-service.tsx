import { get } from "./api";

export const ContentService = {

    getContent: async (route: string[]): Promise<any> => {
        var url: string = "";
        url = "/umbraco/delivery/api/v2/content/item/" + route.join("/");
        if (url.endsWith("/")) {
            url = url.slice(0, -1);
        }
        const apiUrl = `content?content=${url}`
        return (await get(apiUrl)).data;

    },

    //get content with pagintion
    getBlogPosts: async (tags: string[], take: number, skip: number) => {
        var url: string = "";
        url = '/umbraco/delivery/api/v2/content?filter=contentType:post'
        var skipFilter = skip ? '&skip=' + skip : '';
        var takeFilter = take ? '&take=' + take : '';
        var tagsFilter = take ? '&filter=tags:' + tags.map(x=>x) : '';
        url += skipFilter + takeFilter + tagsFilter;
        const apiUrl = `content?content=${url}`;

        try {
            return (await get(url)).data;
        } catch (error) {
            console.error('Error fetching getContent:', error, apiUrl);
            throw error;
        }
    },

}