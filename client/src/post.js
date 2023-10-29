import { formatISO9075 ,format } from 'date-fns';

export default function Post({cover,author,updatedAt,summary,title}){
    return (
        <div className="post">
            <div className="image">
                <img src={'http://localhost:4000/'+cover} alt="blog-image"/>
            </div>
            <div className="text">
                <h2>{title}</h2>
                <p className="info">
                    <a className="author">{author?.username}</a>
                    {/* <time>{formatISO9075(new Date(updatedAt))}</time> */}
                    <time>{format(new Date(updatedAt) , 'MMM d, yyyy HH:mm')}</time>
                </p>
                <p className="summary">{summary}</p>
            </div>
        </div>
    )
}