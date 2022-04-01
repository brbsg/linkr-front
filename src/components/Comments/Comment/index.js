export default function Comment({comment}) {
    return(
        <div>
            <img src={comment.image}/>
            <div>
                <b>{comment.name}</b>
                <p>{comment.text}</p>
            </div>
        </div>
    )
}