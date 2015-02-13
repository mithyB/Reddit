function QueryBuilder(type, json) {
    var query;
    var isFirst = true;
    if (type == 'posts') {
        query = 'https://www.reddit.com/' + json.thing.type.toWebKey() + '/' + json.thing.name +
            (json.sort ? '/' + json.sort : '') + '/.json';
        if (json.sortType) {
            isFirst = false;
            query += '?sort=' + json.sort + '&t=' + json.sortType
        }

        if (json.params) {
            for (var i = 0; i < json.params.length; i++) {
                if (json.params[i][1]) {
                    query += (isFirst ? '?' : '&') +
                        json.params[i][0] + '=' + json.params[i][1];
                    isFirst = false;
                }
            }
        }
    } else if (type == 'post') {
        query = 'https://www.reddit.com/r/' + json.thing.name + '/comments/' + json.id + '/.json';
    } else if (type == 'comment') {
        query = 'https://www.reddit.com' + json.permalink + json.commentId + '/.json';
    } else if (type == 'sidebar') {
        query = 'https://www.reddit.com/r/' + json.thing.name + '/about.json';
    } else {
        console.log('invalid QueryBuilder type');
    }

    QueryBuilder.prototype.build = function() {
        return query;
    }
}

// usage: (example)
//
//var query = new QueryBuilder('posts', {
//    thing: {
//        name: 'all',
//        type: 't5' // t5 = subreddit
//    },
//    sort: 'top',
//    sortType: 'week',
//    params: {
//        after: 't5_a93fg',
//        count: 25
//    }
//}).build();
