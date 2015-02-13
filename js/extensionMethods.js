String.prototype.toKey = function () {
    if (this == ThingTypes.account) {
        return 'u';
    } else if (this == ThingTypes.subreddit) {
        return 'r';
    } else {
        return '[invalid string]'
    }
}
String.prototype.toWebKey = function () {
    if (this == ThingTypes.account) {
        return 'user';
    } else  if (this == ThingTypes.subreddit) {
        return 'r';
    } else {
        return '[invalid string]'
    }
}
String.prototype.toDisplay = function () {
    if (this == ThingTypes.account) {
        return 'user';
    } else if (this == ThingTypes.subreddit) {
        return 'subreddit';
    } else {
        return '[invalid string]'
    }
}

String.prototype.isComment = function() {
    return this == ThingTypes.comment;
}
String.prototype.isSubreddit = function() {
    return this == ThingTypes.subreddit;
}

Array.prototype.updateMoreComments = function(id, addComments) {
    for (var i = 0; i < this.length; i++) {
        if (this[i]) {
            if (this[i].data.name == id) {
                this.splice(this.indexOf(this[i]), 1);

                for (var n = 0; n < addComments.length; n++) {
                    if (addComments[n]) {
                        this.push(addComments[n]);
                    }
                }
                return;
            }

            if (this[i].data.replies) {
                this[i].data.replies.data.children.updateMoreComments(id, addComments);
            }
        }
    }
}