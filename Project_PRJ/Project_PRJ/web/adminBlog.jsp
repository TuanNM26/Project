<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link href="style/main.css" rel="stylesheet" type="text/css"/>
        <title>Document</title>
    </head>
    <body>
        
        <div class="container">
            <div class="row">
                <div class="col-xl-12">
                    <div class="row t-header">
                        <div class="col-xl-12 bg-green-color t-header-height">
                            <div class="t-header-content">
                                <div class="text"><i class="fa-solid fa-users-rectangle"></i> Blog</div>
                               
                                <div class="flex-basic">
                                     <ul class="sub-menu">
                                            <li><a href="blog">Home 1</a></li>
                                            <li><a href="adminBlog">Home 2</a></li>
                                        </ul>
                                    <div class="dropdown font-size-13">
                                        <a href="">Welcome <span><%= request.getSession().getAttribute("user") %></span></a>
                                    </div>
                                    <div class="dropdown  margin-lt-16 font-size-13">
                                        <a href="logout"> <i class="fa-solid fa-right-from-bracket"></i> Logout</a>
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </div>
                    <div class="row t-content-height">
                        <div class="col-xl-2 bg-green-color t-navbar-height border-nav-right">
                            <div class="menu-items">
                                <a href="./employee-list.html">
                                    <div class="flex-basic t-menu-content active-menu">
                                        <i class="fa-solid fa-list"></i>
                                        <div class="margin-lt-8">Blog list</div>
                                    </div>
                                </a>
                                <a href="adminAddBlog">
                                    <div class="flex-basic t-menu-content t-menu-content-last">
                                        <i class="fa-solid fa-plus"></i>
                                        <div class="margin-lt-8">Add blog</div>
                                    </div>
                                </a>
                            </div>


                        </div>
                        <div class="col-xl-10 bg-red-color ">
                            <div class="row">


                                <!-- content -->
                                <div  class="main-content-wrap container " id="view-load">
                                    <div class="content-header">
                                        <p>Blog list</p>
                                    </div>

                                    <div>
                                        <form action="" id="employee-list" class="form-content margin-top-24 form">

<!--                                            <div class="filter-group flex-basic flex-jc-end margin-right-24">
                                                 Actual search box 
                                                <div class="form-group has-search ">
                                                    <span class="fa fa-search form-control-feedback"></span>
                                                    <input type="text" class="form-control padding-lt-8" placeholder="Search">
                                                </div>


                                                <div class="flex-basic margin-lt-8">

                                                </div>
                                                <div>
                                                    <button type="button " class="margin-lt-8 backgroud-green width-100 btn-light t-btn t-btn-blue t-btn-hover btn btn-success">Search</button>
                                                </div>
                                            </div>-->

                                            <div class="form-header">
                                                Total post: <span>${total}</span>
                                            </div>
                                            <div class="row">
                                                <div class="form-body content-list    ">
                                                    <table class="table  table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">ID</th>
                                                                <th scope="col">Title</th>
                                                                <th scope="col">Thumbnail</th>
                                                                <th scope="col">Author</th>
                                                                <th scope="col">Date</th>
                                                                <th scope="col">Status</th>
                                                                <th scope="col">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <c:forEach var="o" items="${list}">
                                                                <tr>
                                                                    <th scope="row">${o.id}</th>
                                                                    <td >${o.title} </td>
                                                                    <td> ${o.thumbnail}</td>
                                                                    <td>${o.author}</td>
                                                                    <td>${o.date} </td>
                                                                    <td> ${o.status==1?"Active":"Deactive"}</td>
                                                                    <td>
                                                                        <a href="adminEditBlog?id=${o.id}"><i class="fa-solid fa-edit"></i>Edit</a>
                                                                        <span>|</span>
                                                                        <a href="delete?id=${o.id}" class="error"><i class="fa-solid fa-trash"></i>Delete</a>
                                                                    </td>
                                                                </tr>
                                                            </c:forEach>
                                                        </tbody>
                                                    </table>


                                                </div>
                                            </div>


                                        </form>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>  
        <script src="../js/view-content.js" type="text/javascript"></script>

    </body>
</html>