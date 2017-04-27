/**
 * Created by out_xu on 17/3/25.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { delNews, editNews, getNews, getNewsList } from 'actions'

import NewsManage from 'components/admin/News'

@connect(
  state => ({
    admin: state.admin
  }),
  dispatch => bindActionCreators({getNewsList, editNews, delNews, getNews}, dispatch),
)
class NewsManageContainer extends Component {
  componentDidMount () {
    this.props.getNewsList()
  }

  render () {
    const {admin: {newsList, news}, editNews, getNewsList, delNews, getNews} = this.props
    return (
      <NewsManage
        newsList={newsList.news || []}
        news={news}
        editNews={editNews}
        getNewsList={getNewsList}
        delNews={delNews}
        getNews={getNews}
      />
    )
  }
}

export default NewsManageContainer
