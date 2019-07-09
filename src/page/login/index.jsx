import React from 'react';
import MUtil    from 'util/mm.jsx';
import User from 'service/user-service.jsx'
import './index.css';

const _mm = new MUtil;//因为引入的mm.jsx是一个类
const _user = new User();

class Login extends React.Component{

	constructor(props){
		super(props)
		this.state={
			username:'',
			password:'',
			redirect:_mm.getUrlParam('redirect') || ''
		}
	}
	componentWillMount(){
        document.title = '登录 - MMALL ADMIN';
    }
	onInputChange(e){
        let inputValue  = e.target.value,
            inputName   = e.target.name;   //这里能分别取到两个input框值，需要定义两个input框的name属性
        this.setState({
            [inputName] : inputValue
        });
    }
    //在登陆页面输入用户名和密码之后，要实现按下回车键即可登陆的方法有两种
    //1、登陆表单模块都在form标签内，再依托button标签的onSubmit事件
    //2、input标签的onKeyUp事件
    onInputKeyUp(e){
        if(e.keyCode === 13){
            this.onSubmit();
        }
    }
    // 当用户提交表单
    onSubmit(){
        // _mm.request({
        // 	type:'post',
        // 	url:'/manage/user/login.do',
        // 	data:{
        // 		username:this.state.username,
        // 		password:this.state.password
        // 	}
        // }).then((res)=>{

        // })
        let loginInfo= {
	        	username:this.state.username,
	        	password:this.state.password
	        },
	        checkResult = _user.checkLoginInfo(loginInfo);
        //验证通过
        if(checkResult.status){
        	_user.login(loginInfo).then((res)=>{
                //不用封装好的_mm
        		// localStorage.setItem('userInfo',JSON.stringify(res));  //保存登陆信息
                _mm.setStorage('userInfo', res);
        		this.props.history.push(this.state.redirect);
        	}, (errMsg)=>{
        		_mm.errorTips(errMsg);
        	})
        }
        //验证不通过
        else{
        	_mm.errorTips(checkResult.msg);
        }
    }
	render(){
		return(
			<div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登录 - MMALL管理系统</div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                <input type="text"
                                    name="username"
                                    className="form-control"
                                    placeholder="请输入用户名" 
                                    onKeyUp={e => this.onInputKeyUp(e)}
                                    onChange={e => this.onInputChange(e)}/>
                            </div>
                            <div className="form-group">
                                <input type="password" 
                                    name="password"
                                    className="form-control" 
                                    placeholder="请输入密码" 
                                    onKeyUp={e => this.onInputKeyUp(e)}
                                    onChange={e => this.onInputChange(e)}/>
                            </div>
                            <button className="btn btn-lg btn-primary btn-block"
                                onClick={e => {this.onSubmit(e)}}>登录</button>
                        </div>
                    </div>
                </div>
            </div>
		)
	}
}
export default Login;