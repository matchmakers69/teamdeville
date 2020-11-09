/* eslint-disable camelcase */
import React, { Component } from 'react';
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';
import _isNil from 'lodash/isNil';
import moment from 'moment';
import cx from 'classnames';
import Loader from '../../components/common/Loader';
import wordpressConfig from '../../utils/wordpress.config';
import styles from './Styles.module.scss';

class SinglePost extends Component {
  state = {
    post: {},
    isLoading: true,
  };

  _isMounted = false;

  componentDidMount = () => {
    this._isMounted = true;
    this.fetchSinglePost();
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchSinglePost = async () => {
    const URL = wordpressConfig.jsonUrl;
    try {
      const res = await axios.get(`${URL}posts/${this.props.match.params.id}`);
      const { data } = res;
      if (this._isMounted) {
        this.setState({
          post: data,
          isLoading: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  renderpostDate = () => {
    const { post } = this.state;
    const { date } = post;
    let newDate = null;
    const now = moment(date);
    newDate = now.format('Do MMM YYYY');
    return newDate;
  };

  render() {
    const { isLoading, post } = this.state;
    const {
      author_name, content, title,
    } = post;


    const showTitle = !_isNil(title) ? title : 'Title is coming soon';
    const showContent = !_isNil(content) ? content : 'Content is coming soon';

    return (
      <Loader isLoading={isLoading}>
        <section className="section top__indent-large">
          <div className="container fluid">
            <div className="row">
              <div className="col-xs-12">
                <div className={styles.singlePostContent}>
                  <header className={styles.headerDetailsPost}>
                    <div className={cx(styles.colDetails)}>
                      <span className={styles.postDetailsPost}>
                        {`Published on: ${this.renderpostDate()}`}
                      </span>
                    </div>
                    <div
                      className={cx(styles.colDetails, styles.authorDetails)}
                    >
                      <span className={styles.postDetailsPost}>
                        {`Posted by: ${author_name}`}
                      </span>
                    </div>
                  </header>
                  <h1 className="h1">{showTitle.rendered}</h1>
                  <div
                    dangerouslySetInnerHTML={{ __html: showContent.rendered }}
                    className={styles.singlePostText}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Loader>
    );
  }
}

export default SinglePost;
