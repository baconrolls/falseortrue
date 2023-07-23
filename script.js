const gridContainer = document.getElementById("gridContainer");

// Replace 'YOUR_BLOGGER_API_KEY' and 'YOUR_BLOG_ID' with your actual API key and blog ID
const apiKey = 'AIzaSyCC0FV2KHbAUfxxIr-I1sioy1EOfJMbZ3o';
const blogId = '7045434096172710203';
const maxResults = 9; // Maximum number of latest posts to fetch

const apiUrl = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}&maxResults=${maxResults}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const posts = data.items;
    posts.forEach(post => {
      const title = post.title;
      const imageUrl = post.images?.[0]?.url;
      const link = post.url;

      if (imageUrl) {
        const postCard = createPostCard(title, imageUrl, link);
        gridContainer.appendChild(postCard);
      }
    });
  })
  .catch(error => {
    console.error('Error fetching Blogger posts:', error);
  });

function createPostCard(title, imageUrl, link) {
  const postCard = document.createElement("a");
  postCard.classList.add("post-card");
  postCard.href = link;
  postCard.target = "_blank";

  const postImage = document.createElement("img");
  postImage.src = imageUrl;
  postImage.alt = title;

  const postTitle = document.createElement("h3");
  postTitle.textContent = title;

  postCard.appendChild(postImage);
  postCard.appendChild(postTitle);

  return postCard;
}
