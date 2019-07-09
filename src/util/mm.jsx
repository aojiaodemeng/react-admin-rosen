class MUtil{
	request(param){
		return new Promise((resolve,reject) => {
			$.ajax({
				type: param.type         || 'get',
				url: param.url           || '',
				dataType: param.dataType || 'json',
				data: param.data         || null,
				success(res){
					if(0===res.status){
						//数据请求成功
						typeof resolve === 'function' && resolve(res.data,res.msg);
					}else if(10===res.status){
						//没有登陆状态，强制登陆
						this.doLogin();
					}else{
						typeof reject === 'function' && resolve(res.msg || res.data);
					}
				},
				error(err){
					typeof reject === 'function' && resolve(err.statusText);
				}
			});		
		
		});
	}
	// 跳转登陆
	doLogin(){
		window.location.href="/login?redirect="+encodeURIComonent(window.location.pathname)
	}
	//获取Url参数
	getUrlParam(){
		//   XXXX.com?param=123&param1=456
		let queryString = window.location.search.split('?')[1] || '',
            reg         = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result      = queryString.match(reg);
            //result : ['param=123','','123','&']
        return result ? decodeURIComponent(result[2]) : null;
	}
	//错误提示
	errorTips(errMsg){
		alert(errMsg || '好像哪里不对了~')
	}
	//存储
	setStorage(name, data){
		let dataType = typeof data;
		//JSON类型
		if(dataType === 'object'){
			window.localStorage.setItem(name, JSON.stringify(data));

		}
		//基础类型
		else if(['number','string','boolean'].indexOf(dataType) >= 0){
			window.localStorage.setItem(name,data);
		}
		//其他不支持的类型
		else{
			alert('该类型不能用于本地存储')
		}
	}
	//取出存储内容
	getStorage(name){
		let data = window.localStorage.getItem(name);
		if(data){
			return JSON.parse(data);
		}else{
			return '';
		}
	}
	//删除存储内容
	removeStorage(name){
		window.localStorage.removeItem(name);
	}
}
export default MUtil;