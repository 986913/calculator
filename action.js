
	function addToScreen(obj)
	{
		var oShow=document.getElementById('show');
		var oResult=document.getElementById('result');
		var oList=document.getElementById('list');
		var pushed = obj.innerHTML;

		if(pushed=='AC')//clear all
			{
				oShow.innerHTML='0';
				oResult.innerHTML='0';
			}
		else if(pushed=='=')
			{
				oResult.innerHTML=eval(oShow.innerHTML);
				
				// save history:
				var oTd= document.createElement('td');
				var aTd= oList.getElementsByTagName('td');
				oTd.style.display='block';
				oTd.innerHTML=oShow.innerHTML+'='+oResult.innerHTML;
				if(aTd.length>0)
					{oList.insertBefore(oTd,aTd[0]);}
				else
					{oList.appendChild(oTd);}

				//show as empty:
				oShow.innerHTML='';

			}
		else if(pushed=='DEL')//delete 
			{oShow.innerHTML=oShow.innerHTML.substring(0,oShow.innerHTML.length-1);}
		else
			{
				if(oShow.innerHTML=='0'||'')
					{oShow.innerHTML=pushed;}
				else
					{
						oShow.innerHTML=oShow.innerHTML+pushed;	
					}
			}

	}
///////////////////////////////////////////////////////////////////
	function getHistory(ev)
	{
		var oEvent=ev||event ;
		var oBox=document.getElementById('historyBox');
		var oCal=document.getElementById('cal');

		startMove(oCal,{opacity:0});

		oBox.style.display='block';
		oEvent.cancelBubble=true; //through the event object to cancel Bubble effect.
		startMove(oBox,{opacity:70, top:100});//div开始移动
	}
	document.onclick=function()// 收回div
	{	    
		var oBox=document.getElementById('historyBox');
		var oCal=document.getElementById('cal');
		startMove(oBox,{opacity:0,top:1500});
		// oBox.style.display='none';
		startMove(oCal,{opacity:100});

	}

//////////////////////////////////////////////////////////////
	function getStyle(obj,name)
		{
			if(obj.currentStyle)
				{return obj.currentStyle[name];}
			else
				{return getComputedStyle(obj,false)[name];}
		}
	function startMove(obj,json,funEnd)//funEnd是个函数，会在函数结束的时候被调用
		{
			clearInterval(obj.timer);
			obj.timer=setInterval(function()
			{
						var bStop=true;//假设所有的值都已经到了

						for(var attr in json)//对json里面的每一个都循环一变
						{
							var cur=0;
							if(attr=='opacity')
							{cur=Math.round(parseFloat(getStyle(obj,attr))*100);}
							else
							{cur =parseInt(getStyle(obj,attr));}

							var speed=(json[attr]-cur)/6;
							speed=speed>0?Math.ceil(speed):Math.floor(speed);

							if(cur!=json[attr])//碰到了一个没有到达目标点的值
								bStop=false;

							if(attr=='opacity')
								{
									obj.style.filter='alpha:(opacity:'+(cur+speed)+")";//ie
									obj.style.opacity=(cur+speed)/100;//chrome

								}
							else
								{obj.style[attr]=cur+speed+'px';}
				
						}

						if(bStop)
						{
							clearInterval(obj.timer);
							 	if(funEnd) 
							 		{funEnd();}//funEnd是个函数，会在函数结束的时候被调用
						}

			},30);
		}
