const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    solo: {
        type: Boolean,
        default: false
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    problems: [{
        type: Schema.Types.ObjectId,
        ref: 'Problem'
    }],
    roomPhotoUrl: {
        type: String,
        required: true
    }
  }, {
    timestamps: true
});

module.exports = Room = mongoose.model('Room', RoomSchema);
