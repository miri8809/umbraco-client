import { ContentService } from "@/services/content-service";

interface PostProps {
    params: { id: string }
}
const PostPage: React.FC<PostProps> = async (props) => {
    const result = await ContentService.getContent(['blog', props.params.id]);
    if (result) {
        const { items: posts } = result;
        console.log(result);
        return <div>
            <h1>{result.properties.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: result.properties.bodyContent ? result.properties.bodyContent.markup : '' }}></div>
            <p> {result.properties.autherName}</p>
            <span>{result.properties.publishDate}</span>
        </div>
    }
    return <p>eroor</p>
}
export default PostPage