import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';


export default (
    <Route path="/" component={App}>  
        <IndexRoute component={PostsIndex} />
        <Route path="posts/new" component={PostsNew} />
        <Route path="posts/:id" component={PostsShow} /> 
    </Route>
); 

/* react-router will automatically parse the id and send it as a prop 
to the PostsShow component. this.props.params.id*/

/* All the Route components inside of the outer Route component are nested
to the component App, or to the corresponding component of the outer Route
component. 
All the nested components are available to App as props.children */