import React,{Component} from 'react';
import { Link }     from 'react-router-dom';
import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

const _mm = new MUtil();
const _user = new User();

class NavTop extends Component{
	constructor(props){
		super(props);
        this.state={
            username: _mm.getStorage('userInfo').username
        }
	}
	// 退出登录
    onLogout(){
        _user.logout().then(res => {
            _mm.removeStorage('userInfo');
            // this.props.history.push('/login'); //this.props为空，因为并不是通过Route组件来引用的，所以并没有集成Route里面的history对象
            window.location.href='/login';
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }
	render(){
		return(
			<div className="navbar navbar-default top-navbar">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/"><b>HAPPY</b>MMALL</Link>
                </div>
                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" href="javascript:;">
                            <i className="fa fa-user fa-fw"></i>
                            {
                                this.state.username
                                ? <span>欢迎，{this.state.username}</span>
                                : <span>欢迎您</span>
                            }
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                <a onClick={() => {this.onLogout()}}>
                                    <i className="fa fa-sign-out fa-fw"></i>
                                    <span>退出登录</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
		);
	}
}
export default NavTop;