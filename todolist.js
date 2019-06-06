window.addEventListener("load",function () {
    let tab=document.querySelectorAll(".tab>li");
    // console.log(tab);
    let prev=0;
    let type = "all";
    let content=document.querySelector(".content");
    // console.log(content);

    let forms =document.forms[0];
    console.log(forms);
    let inputs=forms.elements['content'];
    let submits=forms.elements[1];
    submits.onclick=function (e) {
        e.preventDefault();
        let obj=creatobj();
        todolist.push(obj);
        forms.reset();
        render(filterDate(type));
    };

    function creatobj(){
        let id = todolist[todolist.length-1].id+1;
        let content=inputs.value;
        let ctime=new Date().toLocaleDateString();
        let status=false;
        return {id,content,ctime,status};
    }

    let todolist=[
        {id:1,content:"端午要高考",ctime:"2019/5/1",status:true},
        {id:2,content:"端午吃粽子",ctime:"2019/5/2",status:false},
        {id:3,content:"端午交作业",ctime:"2019/5/3",status:false},
        {id:4,content:"数据库考试",ctime:"2019/6/1",status:true},
        {id:5,content:"6.10交需求",ctime:"2019/6/2",status:false},
        {id:6,content:"7.20放暑假",ctime:"2019/6/3",status:false}
    ]

    tab.forEach(function (ele,index) {
        ele.onclick=function () {
            tab[prev].classList.remove("hot");
            this.classList.add("hot");
            prev=index;
            
            let type=this.getAttribute('type');
            render(filterDate(type));
        }
    })
    tab[0].onclick();
    function filterDate(type) {
        let arr=[];
        switch (type) {
            case "all":
                arr=todolist;
                break;
            case "done":
                arr = todolist.filter(function(ele){return ele.status});
                break;
            case 'doing':
                arr = todolist.filter(function(ele){return !ele.status});
                break;
        }
        return arr;
    }

    //视图》数据，li》数组元素，复选框》status
    content.onclick=function (e) {
        let arr=[];
        let target=e.target;
        let id=target.parentNode.id;
        if(target.nodeName==="INPUT"){
            let ele=todolist.filter(ele=>ele.id ==id)[0];
            ele.status=target.checked;
        }else if (target.nodeName==="DEL"&&window.confirm("即将删除此项")){
            let index=todolist.findIndex(ele=>ele.id==id);
            console.log(index);
            todolist.splice(index,1);
            render(todolist);
        }
    }
    let checkboxs=document.querySelectorAll("input[type=checkbox]");
    checkboxs.forEach(ele=>{
        ele.onclick=function () {
            let id=this.parentNode.id;
            let arr=todolist.filter(eles=>eles.id==id)[0];
        }
    })

    // let doing=todolist.filter(function (ele) {
    //     return ele.status;
    // });

    //渲染列表
    render(todolist);
    function render(arr) {
        let html=`
            <li>
                <p>★是否完成★</p>
                <p>☆事件内容☆</p>
                <p>★创建时间★</p>
                <p>☆点×删除☆</p> 
             </li>
        `;
        arr.forEach(function(elem,index){

            if(elem.status){
                html+= `
             <li id="${elem.id}">
                   <input type="checkbox" checked>
                    <p>${elem.content}</p>
                    <time>${elem.ctime}</time>
                    <del>×</del> 
                    
             </li>
           `;
            }else{
                html+= `
             <li id="${elem.id}">
                   <input type="checkbox"> 
                   <p>${elem.content}</p>
                   <time>${elem.ctime}</time>
                   <del>×</del>  
             </li>
           `;
            }

        });
        content.innerHTML=html;
    }

})