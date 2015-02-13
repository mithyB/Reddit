function replaceRedditLinks() {
    // --- /r/ ---
    $('a[href^="/r/"]').each(function() {
        this.href = '#r/' + this.pathname.substring(3);
    });
    $('a[href^="http://reddit.com/r/"]').each(function() {
        this.href = this.href.replace(/http:\/\/reddit.com\/r\//, '#r/');
        this.href = redirect(this.href);
    });
    $('a[href^="http://www.reddit.com/r/"]').each(function() {
        this.href = this.href.replace(/http:\/\/www.reddit.com\/r\//, '#r/');
        this.href = redirect(this.href);
    });
    $('a[href^="https://reddit.com/r/"]').each(function() {
        this.href = this.href.replace(/https:\/\/reddit.com\/r\//, '#r/');
        this.href = redirect(this.href);
    });
    $('a[href^="https://www.reddit.com/r/"]').each(function() {
        this.href = this.href.replace(/https:\/\/www.reddit.com\/r\//, '#r/');
        this.href = redirect(this.href);
    });


    // --- /u/ ---
    $('a[href^="/u/"]').each(function() {
        this.href = '#u/' + this.pathname.substring(3);
    });
    $('a[href^="http://reddit.com/u/"]').each(function() {
        this.href = this.href.replace(/http:\/\/reddit.com\/u\//, '#u/');
    });
    $('a[href^="http://www.reddit.com/u/"]').each(function() {
        this.href = this.href.replace(/http:\/\/www.reddit.com\/u\//, '#u/');
    });
    $('a[href^="https://reddit.com/u/"]').each(function() {
        this.href = this.href.replace(/https:\/\/reddit.com\/u\//, '#u/');
    });
    $('a[href^="https://www.reddit.com/u/"]').each(function() {
        this.href = this.href.replace(/https:\/\/www.reddit.com\/u\//, '#u/');
    });
}

function redirect(href) {
    if (/\/comments\//.test(href)) {
        href = href.replace(/\/comments\//, '/comments/');
        var id = href.substring(href.indexOf('/comments/') + 10, href.length);
        id = id.substring(0, id.indexOf('/'));
        return href.substring(0, href.indexOf('/comments/') + 10) + id;
    }
}
