import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router'; 

class PostsNew extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit(props) { // This is a callback function and it has a reference to this.
        // That's why we'll bind the context of the function.
        this.props.createPost(props)
            .then( () => {
                this.context.router.push('/');
            });
   };

    render(){
        const { fields: {title, categories, content}, handleSubmit } = this.props;
        /* ...title below is DESTRUCTURING. 
        It allows the input to have all the properties, such as the event handlers, of the title object.
        So onChange={title.onChange} */
        // below: template string and a ternary
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create a new post</h3>
                <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}> 
                    <label>Title</label>
                    <input type="text" className="form-control" {...title}/>
                    <div className="text-help">{title.touched ? title.error : ''}</div>
                </div>

                <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}> 
                    <label>Categories</label>
                    <input type="text" className="form-control" {...categories}/>
                    <div className="text-help">{categories.touched ? categories.error : ''}</div>
                </div>

                <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}> 
                    <label>Content</label>
                    <textarea className="form-control" {...content} />
                    <div className="text-help">{content.touched ? content.error : ''}</div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values){
    const errors = {};
    
    /* If you want to mark a form as invalid, all you need to 
    do is add a property to the errors object we return and add a 
    TRUTHY VALUE to it. */
    if (!values.title){
        errors.title = "Enter a title";
    }
    if (!values.categories){
        errors.categories = "Enter a category";
    }
    if (!values.content){
        errors.content = "Add some content to your post";
    }

    return errors;
}

/* reduxForm is similar to connect. It also promotes a component to a container,
but reduxForm has 3 arguments (form config, mapStateToProps, mapDispatchToProps) 
 */

export default reduxForm({
    form: 'PostsNewForm',
    fields: ['title', 'categories', 'content'],
    validate
}, null, { createPost })(PostsNew);