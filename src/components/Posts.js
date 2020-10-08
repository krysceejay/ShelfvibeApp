import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions/postActions';
import {useDispatch} from 'react-redux';

class Posts extends Component {
  componentDidMount() {
    //this.props.fetchPosts();
    useDispatch(fetchPosts());
  }
  render() {
    const postItems = this.props.posts.map(post => (
      <View key={post.id}>
        <Text> {post.title} </Text>
      </View>
    ));
    return <View>{postItems}</View>;
  }
}

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
};

// const mapStateToProps = state => ({
//   posts: state.posts.items,
// });

export default Posts;

// export default connect(
//   mapStateToProps,
//   {fetchPosts},
// )(Posts);
