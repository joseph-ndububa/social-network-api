const { Schema, model } = require('mongoose');
const dateFormat = require("dateformat");

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal, "dddd, mmmm dS, yyyy, h:MM:ss TT")
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// get total count of friends
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// export the Thought model
module.exports = Thought;