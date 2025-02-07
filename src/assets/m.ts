const jsonp=(obj:Object, cn?:string)=> {
	//定义一个处理Jsonp返回数据的回调函数
	const callbackName = 'callback' + Math.random().toString(16).slice(2);
	window[callbackName] = function(result) {
		delete window[callbackName];
		obj.success(result);
	}

	//组合请求URL
	var callbackStr = (cn?cn:'callback')+"="+ callbackName;
	var src = obj.url.includes("?") ? (obj.url + "&" + callbackStr) : (obj.url + "?" + callbackStr);
	for(let key in obj.data){
		src += ("&" + key + "=" + obj.data[key]);
	}
	
	//将创建的新节点添加到BOM树上
	var script = document.createElement("script");
	script.src = src;
	document.getElementsByTagName("body")[0].appendChild(script);
}
const KeySuggest = (key:string, cb:Function)=>{
    jsonp({
	    'url': 'https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg',
        'data': {
            'key': key,
            '_': new Date().getTime()
        },
        'success': cb
    }, 'jsonpCallback');
    
}
export {
	KeySuggest
}
