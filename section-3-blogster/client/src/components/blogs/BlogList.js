import React, { Component } from 'react';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBlogs, fetchUser } from '../../actions';

class BlogList extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchBlogs();
  }

  renderBlogs() {
    console.log(this.props);
    return map(this.props.blogs, (blog) => {
      return (
        <div className="card darken-1 horizontal" key={blog.id}>
          <div className="card-stacked">
            <div className="card-content">
              <span className="card-title">{blog.title}</span>
              <p>{blog.content}</p>
            </div>
            <div className="card-action">
              <Link to={`/blogs/${blog.id}`}>Read</Link>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderBlogs()}</div>;
  }
}

function mapStateToProps({ blogs, auth }) {
  return { blogs, auth };
}

export default connect(mapStateToProps, { fetchBlogs, fetchUser })(BlogList);
