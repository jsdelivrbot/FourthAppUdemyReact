import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
//import { bindActionCreators } from 'redux'; No longer needed w the fix below
import { Link } from 'react-router';

class PostsIndex extends Component {
    componentWillMount(){
        this.props.fetchPosts();
    }
    renderPosts(){
        if (this.props.posts){
            return this.props.posts.map( (post) => {
                return (
                    <li className="list-group-item" key={post.id}>
                        <Link to={"posts/" + post.id}>
                            <span className="pull-xs-right">{post.categories}</span>
                            <strong>{post.title}</strong>
                        </Link>
                    </li>
                );
            });
        }
    }
    render(){
        return (
            <div>
                <div className="text-xs-right">
                    <Link to="/posts/new" className="btn btn-primary">
                        Add a Post
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">{this.renderPosts()}</ul>
            </div>
        );
    }
}

function mapStateToProps(state){
    return { posts: state.posts.all }; 
}

/* Having this function can be avoided by sending the action creator 
as a parameter to the connect function instead of the mapDispatchToProps func. 
function mapDispatchToProps(dispatch){
    return bindActionCreators({ fetchPosts }, dispatch);
}*/ 

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);