(function($) {
    /* prepare for the data
    =====================================*/
    $J.labels.sort(function(a, b){
        return b.value - a.value;
        //return b.name - a.name;
    });

    // usage: get param from url
    $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null){
            return null;
        } else{
            return results[1] || 0;
        }
    };
    $J.currentLabel = decodeURI($.urlParam("label"));
    if ($J.currentLabel === 'null') {
        $J.currentLabel = null;
    }

    function simpleClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    /* define Components...
     =====================================*/

    var LabelList = React.createClass({
        getInitialState: function() {
            return {
                labels: simpleClone($J.labels)
            };
        },
        handleClick: function(i, app, e) {
            e.preventDefault();
            var nextSelected = this.state.labels[i].name;
            app.setState({
                selected: nextSelected
            });
            window.history.replaceState({}, '', $J.baseUrl + nextSelected);
        },
        render: function() {
            var list = this,
                selected = this.props.selected,
                createLabel = function(label, i) {
                    var classStr = 'btn',
                        count = label.value;
                        selectClass = 'outline-'
                    if (label.name === selected){
                        selectClass = ''
                    }
                    if (label.type === 'categories'){
                        classStr += ' btn-'+selectClass+'success'
                    }else if (label.type == 'tags'){
                        classStr += ' btn-'+selectClass+'info'
                    }else{
                        classStr += ' btn-'+selectClass+'primary'
                    }
                    if (count > 50000 || count === 1) {
                        count = '';
                    }
                    return (
                        <button type="button"  onClick={list.handleClick.bind(list, i, list.props.app)} className={classStr} key={i}>
                            {label.name} <sup><span className="badge badge-pill badge-light">{count}</span></sup>
                        </button>
                    );
                };

            return (
                <div className="label-section">
                    <h2>标签列表</h2>
                    <hr/>
                    <div>{this.state.labels.map(createLabel)}</div>
                </div>
            );
        }
    });

    var Post = React.createClass({
        render: function() {
            var post = this.props.post;
            return (
                <li className="article">
                    <span className="article-date">{post.date.substr(5)}</span>
                    <a className="article-title" href={post.link}>{post.title}</a>
                </li>
            );
        }
    });

    var YearHeader = React.createClass({
        render: function() {
            var year = this.props.date.substr(0,4);
            return (<li><h3>{year}年</h3></li>);
        }
    });

    var PostList = React.createClass({
        getInitialState: function() {
            return {
                posts: simpleClone($J.posts),
                searchContent: ''
            };
        },
        searchHandler: function(e) {
            var searchContent = e.target.value;
            this.setState({
                posts: this.state.posts,
                searchContent: searchContent
            });
        },
        render: function() {
            var previousDate = '9999-99-99',
                selected = this.props.selected,
                sContent = this.state.searchContent.toLowerCase(),
                createPost = function(post) {
                    if ((selected === "显示全部" || post.labels.indexOf(selected) >= 0) &&
                        (sContent === '' || post.title.toLowerCase().search(sContent) >= 0)) {
                        var postDOM = [];
                        if (post.date.substr(0,4) < previousDate.substr(0,4)) {
                            postDOM.push(<YearHeader date={post.date} />);
                            previousDate = post.date;
                        }
                        postDOM.push(<Post post={post} />);
                        return postDOM;
                    }
                };

            return (
                <section className="articles-section">
                    <form className="form-inline">
                        <h2>文章检索</h2>
                        <div className="input-group mb-2 mr-sm-2 search">
                            <div className="input-group-prepend">
                            <div className="input-group-text"><i className="fas fa-search"></i></div>
                            </div>
                            <input type="text" className="form-control " onChange={this.searchHandler}  id="inlineFormInputGroupUsername2" placeholder="搜索标题中的关键词"/>
                        </div>
                    </form>
                   
                    <hr/>
                    <ul className="articles">{this.state.posts.map(createPost)}</ul>
                </section>
            );
        }
    });

    var ArticlesApp = React.createClass({
        getInitialState: function() {
            return {
                selected: $J.currentLabel || '显示全部'
            };
        },
        render: function() {
            return (
                <div>
                    <LabelList app={this} selected={this.state.selected}/>
                    <PostList selected={this.state.selected}/>
                </div>
            );
        }
    });

    /* Rendering begin...
     =====================================*/

    React.render(<ArticlesApp />, document.getElementById('main'));
}(jQuery));

