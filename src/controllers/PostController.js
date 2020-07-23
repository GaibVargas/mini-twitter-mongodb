const Post = require('../models/Post');
const User = require('../models/User');

module.exports = {
  async create(req, res) {
    const { content, user_id } = req.body;

    const user = await User.findById(user_id);
  
    if(!user) return res.json({ message: 'User not found' });

    const post = await Post.create({ content, author: user });
    await User.findByIdAndUpdate({ _id: user_id }, { $push: { posts: post } });
  
    return res.json(post);
  },

  async show(req, res) {
    const posts = await Post.find().populate('author', 'name').populate('favorites', 'name');

    return res.json(posts);
  },

  async toggleLike(req, res) {
    const { post_id } = req.params;
    const { user_id } = req.body;

    const user = await User.findById(user_id);
    const post = await Post.findById(post_id);

    if(!user) return res.json({ message: 'User not found' });
    if(!post) return res.json({ message: 'Post not found' });

    let isToLike = true;
    for(let fav of post.favorites) {
      if(fav == user_id) {
        isToLike = false;
        break;
      }
    }

    if(isToLike) {
      await Post.findByIdAndUpdate({ _id: post_id }, { $push: { favorites: user } });

      return res.json({ message: 'Liked!' });
    } else {
      const newFavorites = post.favorites.filter(fav => fav != user_id);

      await Post.findByIdAndUpdate({ _id: post_id }, { favorites: newFavorites });
      return res.json({ message: 'Disliked!' });
    }
  }
}