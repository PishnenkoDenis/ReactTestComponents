import "./App.css";
import React, { memo, useState, useEffect } from "react";

const COMMENT_PREFIX = "*";
const INTERVAL = 1000;

async function fetchPosts() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchComments() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    );

    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

//memo для дочернего компонента препятствует перерендеру, вызванному ререндером родительского
//компонента.Ререндер произойдет только при изменении пропсов компонента
const Largelist = memo(({ commentPrefix }) => {
  // const [posts, setPosts] = useState([]);
  // const [comments, setComments] = useState([]);
  const [postsWithComments, setPostsWithComments] = useState([]);

  const fetchData = async () => {
    // const posts = await fetchPosts();
    // const comments = await fetchComments();
    const [posts, comments] = await Promise.all([
      fetchPosts(),
      fetchComments(),
    ]);

    const commentsByPostId = comments.reduce((acc, comment) => {
      const { postId } = comment;

      if (!acc[postId]) {
        acc[postId] = [];
      }

      acc[postId].push(comment);

      return acc;
    }, {});

    const postWithComments = posts.map((post) => {
      return {
        ...post,
        comments: commentsByPostId[post.id],
      };
    });

    setPostsWithComments(postWithComments);
    // return postWithComments;
  };

  useEffect(() => {
    fetchData();
    // fetchData().then((res) => setPostsWithComments(res));
  }, []);

  return (
    <div>
      {postsWithComments.map(({ title, body, id, comments }) => (
        <div key={id}>
          <h3>{title}</h3>
          <p>{body}</p>
          <hr />
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                {commentPrefix} {comment.body}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
});

function App() {
  const [counter, setCounter] = useState(0);

  const increase = () => {
    //функция обьявленная на уровне компонента или в useEffecte
    console.log("Increase"); //будет одинаково пересоздаваться, так как меняется состояние компонента
    setCounter((prev) => prev + 1);
  };

  useEffect(() => {
    const timerId = setInterval(increase, INTERVAL);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="App">
      Left seconds: {counter}
      <Largelist commentPrefix={COMMENT_PREFIX} />
    </div>
  );
}

export default App;
