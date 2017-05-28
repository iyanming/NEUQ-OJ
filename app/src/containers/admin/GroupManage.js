/**
 * Created by out_xu on 16/12/30.
 */
import GroupsManage from 'components/admin/Group/GroupManage'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getGroupTable, getGroupNotices,createGroupNotice} from 'actions'

export default connect(
  state => ({
    groups: state.groups
  }),
  dispatch => bindActionCreators({getGroupTable,getGroupNotices,createGroupNotice}, dispatch),
)(GroupsManage)
