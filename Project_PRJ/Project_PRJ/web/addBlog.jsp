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
                     <div class="text"><i class="fa-solid fa-users-rectangle"></i> Employee</div>
                     <div class="flex-basic">
                       <div class="dropdown font-size-13">
                         <a href="">Welcome <span>Tam</span></a>
                       </div>
                       <div class="dropdown  margin-lt-16 font-size-13">
                         <a href=""> <i class="fa-solid fa-right-from-bracket"></i> Logout</a>
                       </div>
                     </div>
                    </div>
                 </div>  
                </div>
                <div class="row t-content-height">
                  <div class="col-xl-2 bg-green-color t-navbar-height border-nav-right height-initial">
                    
                    <div class="menu-items">
                      <a href="adminBlog">
                          <div class="flex-basic t-menu-content active-menu">
                            <i class="fa-solid fa-list"></i>
                              <div class="margin-lt-8">Blog list</div>
                          </div>
                      </a>
                     <a href="adminAddBlog">
                      <div class="flex-basic t-menu-content t-menu-content-last">
                        <i class="fa-solid fa-plus"></i>
                           <div class="margin-lt-8">Add Blog</div>
                        </div>
                     </a>
                  </div>
                 
                  </div>
                  <div class="col-xl-10 bg-red-color ">
                    <div class="row">
                        <div id="edit" class="main-content-wrap container">
                          <div class="content-header">
                            <p>Add Blog</p>
                        </div>
                            <div class="t-border-bm"></div>
                            <div>
                                <form action="adminAddBlog" method="post"  class="form-content margin-top-24 form" role="form" id="employee-form">
                                     
                                      <div class="row">
                                        <div class="form-body   col-xl-12 ">
                                            <div class="mb-3">
                                                <label for="firstname" class="form-label font-weight-bold">Title <span class="error">(*)</span> </label>
                                                <input type="text" name="title" class="form-control" value="${blog.title}" id="title" placeholder="Enter the title " >
                                              </div>
                                              <div class="mb-3">
                                                <label for="lastname" class="form-label font-weight-bold">Thumbnail<span class="error"> (*)</span> </label>
                                                <input type="text" class="form-control" name="thumbnail" value="${blog.thumbnail}"  id="thumbnail" placeholder="Thumbnail" >
                                              </div>
                                              <div class="mb-3">
                                                <label for="phone" class="form-label font-weight-bold">Brief<span class="error"> (*)</span> </label>
                                                <input type="brief" class="form-control" value="${blog.brief}" name="brief" id="brief" placeholder="brief" >
                                              </div>
                                             <div class="mb-3">
                                                <label for="author" class="form-label font-weight-bold">Author<span class="error"> (*)</span> </label>
                                                <input type="author" class="form-control" value="${blog.author}" name="author" id="author" placeholder="Author" >
                                              </div>
                                              <div class="mb-3">
                                                <label for="date" class="form-label font-weight-bold">flag<span class="error"> (*)</span> </label>
                                               <div class="flex-basic">
                                                   <div class="check-group margin-lt-16"> 
                                                       <input ${blog.flag==1?"checked":""} type="radio" name="flag" id="flag" value="on" > <label for="male" class="margin-bm-0 margin-lt-8">Yes</label>
                                                </div>

                                                <div class="check-group margin-lt-16">
                                                  <input ${blog.flag==0?"checked":""} type="radio" name="flag" id="flag" value="off"> <label for="female" class="margin-bm-0 margin-lt-8">No</label>
                                                </div>
                                              </div>
                                             
                                              </div>
                                             
                                             
                                              <div class="mb-3">
                                                <label class="form-label font-weight-bold">Category<span class="error"> (*)</span></label>
                                                <select class="form-control" name="cate_id">
                                                    <c:forEach var="o" items="${listC}">
                                                        <option value="${o.cate_id}">${o.name}</option>
                                                    </c:forEach>
                                                </select>
                                              </div>
  
                                              <div class="mb-3">
                                                <label for="address" class="form-label font-weight-bold">Description</label>
                                                <textarea class="form-control" name="Description" id="address" rows="3">${blog.description}</textarea>
                                              </div>

                                             <div class="mb-3">
                                                <label for="date" class="form-label font-weight-bold">Status<span class="error"> (*)</span> </label>
                                               <div class="flex-basic">
                                                   <div class="check-group margin-lt-16"> 
                                                       <input ${blog.status==1?"checked":""} type="radio" name="status"  value="on"> <label for="male" class="margin-bm-0 margin-lt-8">Active</label>
                                                </div>

                                                <div class="check-group margin-lt-16">
                                                  <input ${blog.status==0?"checked":""} type="radio" name="status"  value="off"> <label for="female" class="margin-bm-0 margin-lt-8">Deactive</label>
                                                </div>
                                              </div>
                                             
                                              </div>

                                              <div class="row">
<!--                                                   <div class="col-xl-1">
                                                    <button type="button" class="width-100 font-size-inherit btn btn-info " id="btnEdit"><i class="fa-solid fa-edit"></i> Edit</button>
                                                </div>
                                                <div class="col-xl-1 padding-lt-0">
                                                    <button type="reset" class=" width-100 font-size-inherit btn btn-warning"><i class="fa-solid fa-rotate-right"></i> Reset</button>
                                                </div>-->
                                                <div class="col-xl-1 padding-lt-0">
                                                    <button type="submit" class=" width-100 font-size-inherit  btn btn-success "><i class="fa-solid fa-plus"></i> Add</button>
                                              </div>
                                               
                                               
                                              </div>
                                             
                                           
                                          </div>
                                      </div>
                                      
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
            </div>
            <div id="toast"></div>
        </div>
        
      </div>
      <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.js"></script>
      <script src="../js/validate.js" type="text/javascript"></script>
      <script src="../js/profile.js" type="text/javascript"></script>
      <script src="../js/load-profile.js" type="text/javascript"></script>
</body>
</html>