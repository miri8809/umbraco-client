import React from 'react';
import ComponentData from "@/models/ComponentData";
import '../assets/styles/post-page.scss';
import moment from 'moment';
const PostPage: React.FC<ComponentData> = (props) => {
    return (
        <div className='post-page'>
            <h1>{props.data.title}</h1>
            <p>{props.data.autherName}</p>
            <span>{moment(props.data.publishDate).format('DD-MM-yyyy')}</span>
            <div dangerouslySetInnerHTML={{ __html: props.data.bodyContent ? props.data.bodyContent.markup : '' }}></div>
        </div>
    );
}

export default PostPage;
