import { formatISO9075 ,format } from 'date-fns';
import { Link } from 'react-router-dom';

export default function Post({_id,cover,author,updatedAt,summary,title}){
    return (
        <div className="post">
            <div className="image">
                <Link to={`/post/${_id}`}>
                    <img src={'http://localhost:4000/'+cover} alt="blog-image"/>
                </Link>                
            </div>
            <div className="text">
                <Link to={`/post/${_id}`}>
                    <h2>{title}</h2>
                </Link>
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