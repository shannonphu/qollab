var annotationSchema = new schema({
    origin: [Number], // 2D tuple verification?
    height: Number,
    width: Number,
})

var schema = new schema({
    // Do comments need some kind of ID?
    annotation: annotationSchema, // May be undefined
    text: { type: String, required: true },
    resolved: { type: Boolean, default: false },
    replies: [String], // []
    votes: { type: Number, default: 0 }, // No verification
})

// Add annotation
schema.methods.addAnnotation = function(origin, height, width) {
    if(resolved)
        return;
    this.annotation = new annotationSchema({
        origin: origin,
        height: height,
        width: width,
    })
    this.save()
}

// Add Reply
schema.methods.addReply = function(text) {
    if(resolved)
        return;
    this.replies.push(text)
}

// Upvote
schema.methods.upvote = function() {
    if(resolved)
        return;
    this.votes++
}

// Resolve comment (needs auth?)
schema.methods.resolve = function() {
    resolved = true
}

module.exports = mongoose.model('Comment', schema)