/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package project.model;

/**
 *
 * @author duong
 */
public class category_blog {
    int cate_id;
    String name;

    public category_blog() {
    }

    public category_blog(int cate_id, String name) {
        this.cate_id = cate_id;
        this.name = name;
    }

    public int getCate_id() {
        return cate_id;
    }

    public void setCate_id(int cate_id) {
        this.cate_id = cate_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "category_blog{" + "cate_id=" + cate_id + ", name=" + name + '}';
    }
    
}
