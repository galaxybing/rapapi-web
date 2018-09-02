import React, { Component } from 'react'
import { PropTypes, connect } from '../../family'
import { login, hideErrMessage } from '../../actions/account'
// import { Link } from 'react-router-dom'
import { serve } from '../../config'
import Mock from 'mockjs'
import './LoginForm.css'

// 模拟数据
const mockUser = process.env.NODE_ENV === 'development'
  ? () => Mock.mock({
    email: 'admin@rap2.com',
    password: 'guest@66D',
    errMessageVisible: false,
  })
  : () => ({
    email: '',
    password: '',
    errMessageVisible: false,
  })

// mockUser.captchaId = Date.now()

// 展示组件
class LoginForm extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }
  static propTypes = {
    auth: PropTypes.object.isRequired
  }
  constructor (props) {
    super(props)
    this.state = mockUser()
  }
  guestLoginHandler = () => {
    let { history } = this.props
    this.props.onLogin({
      email: 'guest@317hu.com',
      password: 'guest@66D',
      captcha: ''
    }, () => {
      // let { pathname } = history.location
      // if (pathname !== '/account/login') history.push(pathname) // 如果用户在其他业务页面，则不跳转
      // else history.push('/') // 跳转到用户面板
      // 
      // history.push('/organization/repository?organization=4');
      history.push('/organization/repository/guester?id=17');
    })
  }
  render () {
    if (this.props.auth.message) {
      this.state.loading = false;
    }
    return (
      <section className='LoginForm'>
        <div className='guest-model'>
          <a style={{color: '#007bff', cursor: 'pointer'}} onClick={this.guestLoginHandler}>【游客身份】</a><br /><br />
          或
        </div>
        {/* <div className='header'>
          <span className='title' style={{textAlign: 'center'}}>登录</span>
        </div> */}
        <form onSubmit={this.handleSubmit}>
          <div className='body'>
            <div className='form-group'>
              <label>邮箱：</label>
              <input value={this.state.email} onChange={e => this.setState({ email: e.target.value, errMessageVisible: false })} className='form-control' placeholder='Email' autoFocus='true' required />
            </div>
            <div className='form-group'>
              <label>密码：</label>
              <input value={this.state.password} type='password' onChange={e => this.setState({ password: e.target.value, errMessageVisible: false })} className='form-control' placeholder='Password' required />
            </div>
            {/* 
              <div className='form-group'>
              <label>验证码：</label>
              <input onChange={e => this.setState({ captcha: e.target.value })} className='form-control' placeholder='验证码' required />
              <img src={`${serve}/captcha?t=${this.state.captchaId || ''}`} onClick={e => this.setState({ captchaId: Date.now() })} alt='captcha' />
            </div> */}
          </div>
          <div className='footer' style={{textAlign: 'center'}}>
            <button type='submit' className='btn btn-primary w140' disabled={this.state.loading ? true: false}>
              <i className={this.state.loading ? `icon icon-spin icon-loading` : `icon icon-spin`}></i>
              登录
            </button>
            {/* <Link to='/account/register'>注册</Link> */}
          </div>
          
          {
            this.props.auth.message && this.state.errMessageVisible ? (
              <div className='alert alert-danger fade show err-message' role='alert'>
                {this.props.auth.message}
              </div>
            ) : ''
          }
        </form>
      </section>
    )
  }
  handleSubmit = (e) => {
    let { history, onLogin, hideErrMessage } = this.props
    e.preventDefault()
    hideErrMessage(); // 置空 错误信息
    this.setState({
      errMessageVisible: true,
      loading: true,
    })
    onLogin(this.state, () => {
      let { pathname } = history.location
      /*
      if (pathname !== '/account/login') history.push(pathname) // 如果用户在其他业务页面，则不跳转
      else history.push('/') // 跳转到用户面板
      */
      history.push('/'); // 修复 直接跳转用户面板，防止首次登录 404
    })
  }
}

// 容器组件
const mapStateToProps = (state) => ({
  auth: state.auth
})
const mapDispatchToProps = ({
  onLogin: login,
  hideErrMessage,
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)
