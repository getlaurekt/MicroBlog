import "./styles.scss";
import postsJson from "./posts.json";
import Post from "./post";

interface PostData {
  title: string;
  content: string;
  upvotes: number;
  downvotes: number;
}

let addedPosts: Post[] = [];

const showNotification = () => {
  const notification = document.getElementById("notification");
  if (notification) {
    notification.classList.replace("hide", "show");
    setTimeout(() => {
      notification.classList.replace("show", "hide");
    }, 2000);
  }
};

const updatePostsCount = () => {
  const postsCount = document.getElementById("postsCount");
  if (postsCount)
    postsCount.textContent = "Number of posts: " + addedPosts.length;
};

const showForBtn = document.getElementById("showForm") as HTMLButtonElement;
showForBtn.onclick = (ev: MouseEvent) => {
  const newPostForm = document.getElementById("newPost");
  if (newPostForm) {
    newPostForm.parentElement!.classList.toggle("show");
    const span = showForBtn.childNodes[1];
    if (span) {
      span.textContent = span.textContent === "add" ? "close" : "add";
    }
  }
};

const addPost = (post: PostData) => {
  let newPost = new Post(
    post.title,
    post.content,
    post.upvotes,
    post.downvotes
  );
  newPost.onRemove = () => {
    const index = addedPosts.indexOf(newPost, 0);
    if (index > -1) {
      addedPosts.splice(index, 1);
    }
    updatePostsCount();
  };
  addedPosts.push(newPost);
  if (addedPosts.length > 3) {
    showNotification();
  }
  updatePostsCount();
};

const newPostForm = document.getElementById("newPost") as HTMLFormElement;
if (newPostForm) {
  newPostForm.onsubmit = (ev: SubmitEvent) => {
    const formData = new FormData(newPostForm);

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    addPost({
      title,
      content,
      upvotes: 0,
      downvotes: 0,
    });
    newPostForm.reset();
    newPostForm.parentElement!.classList.toggle("show");
    return false;
  };
}

for (let post of postsJson) {
  addPost(post);
}
