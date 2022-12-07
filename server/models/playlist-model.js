const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const playlistSchema = new Schema(
    {
        name: { type: String, required: true },
        ownerEmail: { type: String, required: true },
        ownerUserName: { type: String, required: true },
        songs: { type: [{
            title: String,
            artist: String,
            youTubeId: String
        }], required: true },
        likes: {type: Number, required: true},
        dislikes: {type: Number, required: true},
        published: {type: Boolean, required: true},
        comments: [{userName: String, body: String}]
    },
    { timestamps: true },
)

module.exports = mongoose.model('Playlist', playlistSchema)
