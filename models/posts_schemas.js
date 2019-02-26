const mongoose = require('mongoose');

//Room schema
const PostsSchema = mongoose.Schema({

  post_type:{
    type:String
  },
  post_title:{
    type:String
  },
  post_content:{
    type:String
  },
  post_time:{
    type:Date
  },
  post_author:{
    type:String
  },
  post_author_profile_picture:{
    type:String
  },
  post_comments:
  [{
      commenter_name: {type: String},
      commenter_profile_picture: {type: String},
      commenter_content: {type:String}
  }],
  post_video_URL:{
    type:String
  },
  post_image_URL:{
    type:String
  }
});


module.exports = mongoose.model('posts', PostsSchema);
