document.addEventListener('DOMContentLoaded',()=>{
    if(localStorage.getItem('posts')){
        const arr=JSON.parse(localStorage.getItem('posts'));
        loadPosts(arr);
        return;
    }
})
document.getElementById('add-post').addEventListener('submit',(e)=>{
    e.preventDefault();
    const inputPost=document.getElementById('post');
    const postContent=inputPost.value
    inputPost.value=''
    if(localStorage.getItem('posts')){
        const arr=JSON.parse(localStorage.getItem('posts'));
        arr.push({
            content:postContent
        })
        loadPosts(arr);
        localStorage.setItem('posts',JSON.stringify(arr));
        return;
    }
    const arr=[];
    arr.push({id:0,content:postContent})
    localStorage.setItem('posts',JSON.stringify(arr));
    loadPosts(arr);
    return;
})
function loadPosts(arr){
    const body=document.getElementById('posts')
    body.innerHTML=null;
    for(let i=arr.length-1;i>=0;i--){
        body.innerHTML+=template(arr[i].content,i);
    }
}
function deletePost(id){
    const arr=JSON.parse(localStorage.getItem('posts'));
    console.log(arr)
    const newArr=arr.filter((item,idx)=> idx!=id);
    localStorage.setItem('posts',JSON.stringify(newArr));
    console.log(JSON.parse(localStorage.getItem('posts')))
    loadPosts(newArr)
}
function editPost(id){
    const newContent=prompt('Enter new post');
    const arr=JSON.parse(localStorage.getItem('posts'));
    console.log(arr)
    const newArr=arr.map((item,idx)=> {
        if(idx==id){
            item.content=newContent;
        }
        return item;
    });
    localStorage.setItem('posts',JSON.stringify(newArr));
    console.log(JSON.parse(localStorage.getItem('posts')))
    loadPosts(newArr)
}
function template(post,id){
    return `<div id='${id}' class="post">
    <div class="post_profile-image">
        <img src="images/page-profile-image.png" alt="java-logo">
    </div>
    <div class="post_body">
        <div class="post_header">
            <div class="post_header-text">
                <h3>Java
                    <span class="header-icon-section">
                        <span class="material-icons post_badge">verified</span>@java
                    </span>
                </h3>
            </div>
            <div class="post_header-discription">
                <p>${post}</p>
            </div>
        </div>
        <div class="post_footer">
            <span class="material-icons">chat</span>
            <span class="material-icons">favorite_border</span>
            <span onclick="editPost(${id})" class="material-icons">edit</span>
            <span onclick="deletePost(${id})" class="material-icons">delete</span>
        </div>

    </div>

</div>`
}
