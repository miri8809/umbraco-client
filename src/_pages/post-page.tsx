import ComponentData from "@/models/ComponentData";

const PostPage: React.FC<ComponentData> = (props) => {
    return <div>
        <h1>{props.data.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: props.data.bodyContent ? props.data.bodyContent.markup : '' }}></div>
        <p> {props.data.autherName}</p>
        <span>{props.data.publishDate}</span>
    </div>
}
export default PostPage