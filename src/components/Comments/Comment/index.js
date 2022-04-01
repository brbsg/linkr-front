export default function Comment({ comment, user, post, following }) {
    console.log(following)
    return (
    <div>
      <img src={comment.image} />
      <div>
        <span>
          {' '}
          <b>{comment.name}</b>{' '}
          <p>{
            user.name === post.name ? 
            ` • post’s author` 
            : 
            following.find((followed) => followed.name === comment.name) ?
            ` • following`
            :
            ''
            }</p>
        </span>
        <p>{comment.text}</p>
      </div>
    </div>
  );
}
