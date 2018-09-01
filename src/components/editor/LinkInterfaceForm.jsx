import React, { Component } from 'react'
import { PropTypes, connect, Link, Mock } from '../../family'
import { SmartTextarea } from '../utils'
import RepositorySearcher from './RepositorySearcher'

// 模拟数据
const mockModule = process.env.NODE_ENV === 'development'
  ? () => Mock.mock({
    name: '模块@CTITLE(4)',
    description: '@CPARAGRAPH',
    repositoryId: undefined
  })
  : () => ({
    name: '',
    description: '',
    repositoryId: undefined
  })

// 展示组件
class LinkInterfaceForm extends Component {
  static contextTypes = {
    rmodal: PropTypes.object.isRequired,
    onAddModule: PropTypes.func.isRequired,
    onUpdateModule: PropTypes.func.isRequired
  }
  static propTypes = {
    auth: PropTypes.object.isRequired,
    repository: PropTypes.object.isRequired,
    mod: PropTypes.object
  }
  constructor (props) {
    super(props)
    let { mod } = this.props
    this.state = mod ? { ...mod } : mockModule()
  }
  render () {
    const { rmodal } = this.context
    const { repository } = this.props
    return (
      <section>
        <div className='rmodal-header'>
          <span className='rmodal-title'>{this.props.title}</span>
        </div>
        <form className='form-horizontal w600' onSubmit={this.handleSubmit}>
          <div className='rmodal-body'>
            <div className='form-group row'>
              <label className='col-sm-2 control-label'>目标接口：</label>
              <div className='col-sm-10'>
                <RepositorySearcher repository={repository} type={'LinkInterface'} className={'LinkInterfaceSprite'} onResolve={(url) => this.setState({ linkInterfaceUrl: url })} />
              </div>
            </div>
            <div className='form-group row'>
              <label className='col-sm-2 control-label'>备注：</label>
              <div className='col-sm-10'>
                <SmartTextarea name='description' value={this.state.description} onChange={e => this.setState({ description: e.target.value })} className='form-control' placeholder='Description' spellCheck='false' rows='5' />
              </div>
            </div>
          </div>
          <div className='rmodal-footer'>
            <div className='form-group row mb0'>
              <label className='col-sm-2 control-label' />
              <div className='col-sm-10'>
                <button type='submit' className='btn btn-success w140 mr20'>提交</button>
                <Link to='' onClick={e => { e.preventDefault(); rmodal.close() }} className='mr10'>取消</Link>
              </div>
            </div>
          </div>
        </form>
      </section>
    )
  }
  handleSubmit = (e) => {
    e.preventDefault()
    let { onAddModule, onUpdateModule } = this.context
    let { auth, repository } = this.props
    let onAddOrUpdateModule = this.state.id ? onUpdateModule : onAddModule
    let mod = Object.assign({}, this.state, {
      creatorId: auth.id,
      repositoryId: repository.id
    })
    console.log('linkInterfaceUrl->', mod)
    // let { rmodal } = this.context
    // rmodal.close()
    // onAddOrUpdateModule(mod, () => {
    //   if (rmodal) rmodal.resolve()
    // })
  }
}

// 容器组件
const mapStateToProps = (state) => ({
  auth: state.auth
})
const mapDispatchToProps = ({})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkInterfaceForm)
