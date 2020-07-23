const User = require('../models/User');

module.exports = {
  async show(req, res) {
    const users = await User.find().populate('posts');

    return res.json(users);
  },

  async create(req, res) {
    const { name, password } = req.body;

    if(!name || !password){
      return res.json({ message: 'Name and password are required' });
    }

    const user = await User.create({ name, password });

    return res.json(user);
  },

  async login(req, res) {
    const { name, password } = req.body;

    if(!name || !password){
      return res.json({ message: 'Name and password are required' });
    }

    const user = await User.findOne({ name }).populate('posts');
    const passwordIsValid = await user.compareHash(password);

    if(!passwordIsValid) {
      return res.json({ message: `Password for ${name} is invalid` });
    }

    return res.json(user);
  },

  async updateName(req, res) {
    const { _id , name } = req.body;

    if(!name){
      return res.json({ message: 'Name cannot be empty' });
    }

    const user = await User.findByIdAndUpdate(_id, { name }, { new: true });

    return res.json(user);
  },

  async index(req, res) {
    const { user_id } = req.params;

    const user = await User.findById(user_id).populate('posts', ['content', 'favorites']);

    return res.json(user);
  },
}