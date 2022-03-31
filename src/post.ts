interface OnRemoveCallback {
  (): void;
}

class Post {
  public onRemove!: OnRemoveCallback;

  private postRef: HTMLElement;
  private spanUpvotes: HTMLElement;
  private spanDownvotes: HTMLElement;

  private upvotes: number = 0;
  private downvotes: number = 0;

  constructor(
    title: string,
    content: string,
    upvotes: number,
    downvotes: number
  ) {
    const posts = document.getElementById("posts");

    this.postRef = document.createElement("article");
    this.postRef.classList.add("blog__post");

    const h2 = document.createElement("h2");
    h2.classList.add("blog__title");
    h2.textContent = title;
    this.postRef.appendChild(h2);

    const p = document.createElement("p");
    p.classList.add("blog__text");
    p.textContent = content;
    this.postRef.appendChild(p);

    const divVotes = document.createElement("div");
    divVotes.classList.add("blog__votes");
    this.postRef.appendChild(divVotes);

    const divUpvotes = document.createElement("div");
    divUpvotes.classList.add("blog__likes");
    divVotes.appendChild(divUpvotes);

    this.spanUpvotes = document.createElement("span");
    this.spanUpvotes.classList.add("blog__number");
    this.spanUpvotes.textContent = upvotes.toString();
    divUpvotes.appendChild(this.spanUpvotes);

    const buttonUpvote = document.createElement("button");
    buttonUpvote.classList.add("blog__icon");
    buttonUpvote.textContent = "thumb_up";
    buttonUpvote.onclick = () => {
      this.upvote();
    };
    divUpvotes.appendChild(buttonUpvote);

    const divDownvotes = document.createElement("div");
    divDownvotes.classList.add("blog__dislikes");
    divVotes.appendChild(divDownvotes);

    this.spanDownvotes = document.createElement("span");
    this.spanDownvotes.classList.add("blog__number");
    this.spanDownvotes.textContent = downvotes.toString();
    divDownvotes.appendChild(this.spanDownvotes);

    const buttonDownvote = document.createElement("button");
    buttonDownvote.classList.add("blog__icon");
    buttonDownvote.textContent = "thumb_down";
    buttonDownvote.onclick = () => {
      this.downvote();
    };
    divDownvotes.appendChild(buttonDownvote);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("blog__btn");
    deleteButton.textContent = "Remove";
    deleteButton.onclick = () => {
      this.remove();
    };

    const deleteSpan = document.createElement("span");
    deleteSpan.classList.add("btn__icon");
    deleteSpan.textContent = "delete";
    deleteButton.appendChild(deleteSpan);

    this.postRef.appendChild(deleteButton);

    if (posts) {
      if (posts.firstChild) {
        posts.insertBefore(this.postRef, posts.firstChild);
      } else {
        posts.appendChild(this.postRef);
      }
    }

    this.upvotes = upvotes;
    this.downvotes = downvotes;
  }

  private upvote() {
    this.upvotes++;
    this.spanUpvotes.textContent = this.upvotes.toString();
  }

  private downvote() {
    this.downvotes++;
    this.spanDownvotes.textContent = this.downvotes.toString();
  }

  private remove() {
    this.postRef.remove();
    this.onRemove();
  }
}

export default Post;
