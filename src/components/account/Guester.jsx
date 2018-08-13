import { Component } from 'react'
import { PropTypes, connect } from '../../family'
import { login } from '../../actions/account'

// 游客组件
class Guester extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }
  static propTypes = {
    auth: PropTypes.object.isRequired
  }
  constructor (props) {
    super(props);
    this.guestLoginHandler();
  }
  guestLoginHandler = () => {
    let { history, match } = this.props
    let params = match.params && match.params.id ? match.params: history.location.params; // 从路由配置获取
                                                                                          // 或 
                                                                                          // 链接地址获取
    if (params && parseInt(params.id, 10) > 0) {
      this.props.onLogin({
        email: 'guest@317hu.com',
        password: 'guest@66D',
        captcha: 'guest_captcha'
      }, () => {
        history.push(`/organization/repository/guester?id=${params.id}`);
      })
    }
  }
  render () {
    return null
  }
}

// 容器组件
const mapStateToProps = (state) => ({
  auth: state.auth
})
const mapDispatchToProps = ({
  onLogin: login
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Guester)
