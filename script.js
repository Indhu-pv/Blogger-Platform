// Check if user is logged in
if (localStorage.getItem('isLoggedIn') === 'true') {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('signup-container').style.display = 'none';
    document.getElementById('blog-platform').style.display = 'block';
}

// Function to handle signup
function signup() {
    let username = document.getElementById('signup-username').value;
    let email = document.getElementById('signup-email').value;
    let password = document.getElementById('signup-password').value;

    if (username && email && password) {
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('isLoggedIn', 'true');
        
        alert('Account created successfully!');
        window.location.reload();
    } else {
        alert('All fields are required!');
    }
}

// Function to handle login
function login() {
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;

    if (email === localStorage.getItem('email') && password === localStorage.getItem('password')) {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.reload();
    } else {
        alert('Incorrect email or password!');
    }
}

// Function to show login form
function showLogin() {
    document.getElementById('signup-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
}

// Function to show signup form
function showSignup() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('signup-container').style.display = 'block';
}

// Blog logic (similar to the previous example)
let posts = [];
let currentEditIndex = -1;

// Save a new blog post
function saveBlog() {
    let content = document.getElementById('blog-content').value;
    
    if (content.trim() !== '') {
        posts.push(content);
        displayPosts();
        document.getElementById('blog-content').value = '';
    } else {
        alert('Blog post cannot be empty!');
    }
}

// Display all blog posts
function displayPosts() {
    const postList = document.getElementById('posts-list');
    postList.innerHTML = '';

    posts.forEach((post, index) => {
        const postElement = `
            <div class="post">
                <div class="post-title">Post ${index + 1}</div>
                <div class="post-content">${post}</div>
                <button class="edit-btn" onclick="editBlog(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteBlog(${index})">Delete</button>
            </div>
        `;
        postList.innerHTML += postElement;
    });
}

// Edit an existing blog post
function editBlog(index) {
    document.getElementById('blog-content').value = posts[index];
    currentEditIndex = index;
    document.getElementById('save-btn').style.display = 'none';
    document.getElementById('update-btn').style.display = 'inline-block';
}

// Update the edited blog post
function updateBlog() {
    if (currentEditIndex > -1) {
        let updatedContent = document.getElementById('blog-content').value;

        if (updatedContent.trim() !== '') {
            posts[currentEditIndex] = updatedContent;
            displayPosts();
            document.getElementById('blog-content').value = '';
            currentEditIndex = -1;
            document.getElementById('save-btn').style.display = 'inline-block';
            document.getElementById('update-btn').style.display = 'none';
        } else {
            alert('Blog post cannot be empty!');
        }
    }
}

// Delete a blog post
function deleteBlog(index) {
    posts.splice(index, 1);
    displayPosts();
}