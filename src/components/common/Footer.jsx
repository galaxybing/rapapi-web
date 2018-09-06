import React from 'react'
import { connect } from 'react-redux'
import './Footer.css'

const Footer = ({ counter = {} }) => (
  <div className='Footer'>
    {/* v{counter.version} */}
    <p>317护 前端架构[fe-master]</p>
    <span className='ml10 mr10 color-c'>|</span>
    {counter.users} 人正在使用
    <span className='ml10 mr10 color-c'>|</span>
    今日 Mock 服务被调用 {counter.mock} 次
  </div>
)

const mapStateToProps = (state) => ({
  counter: state.counter
})
const mapDispatchToProps = ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)
