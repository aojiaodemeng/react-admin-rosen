import React,{Component} from 'react';
class ListSearch extends Component{
    constructor(props){
        super(props);
        this.state={
            searchType : 'productId', //productId,productName
            searchKeyword: '',
        }
    }
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name]: value
        });
    }
    //点击搜索按钮的时候
    onSearch(){
        this.props.onSearch(this.state.searchType,this.state.searchKeyword);
    }
    //输入搜索关键字后按回车，自动提交
    onSearchKeywordUp(e){
        if(e.keyCode === 13){
            this.onSearch()
        }
    }
    render(){
        return (
            <div className="row search-wrapper">
					<div className="col-md-12">
						<form className="form-inline">
							<div className="form-group">
								<select className="form-control"
                                    name="searchType"
                                    onChange={(e) => {
                                        this.onValueChange(e)
                                    }}
                                >
									<option value="productId">按商品ID查询</option>
									<option value="productName">按商品名称查询</option>
								</select>
							</div>
							<div className="form-group">
								<input type="text" className="form-control" placeholder="关键词"
                                    name="searchKeyword"
                                    onChange={(e) => {
                                        this.onValueChange(e)
                                    }}
                                    onKeyUp={(e)=>this.onSearchKeywordUp(e)}
                                />
							</div>
							<button type="submit" className="btn btn-primary"
                                onClick={(e)=>this.onSearch()}
                            >搜索</button>
						</form>
					</div>
				</div>
        )
    }
}
export default ListSearch;
