// eslint-disable-next-line no-unused-vars
const dummy = (blog) => {
  return 1
}

const favoriteBlog = (blogs) => {
  const fav = blogs.reduce((eniten, blog) => {
    return eniten.likes > blog.likes ? eniten : blog
  })
  return {
    title: fav.title,
    author: fav.author,
    likes: fav.likes
  }
}

module.exports = {
  dummy, favoriteBlog
}