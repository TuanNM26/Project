/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package project.model;

import java.time.LocalDate;

/**
 *
 * @author duong
 */
public class blog_detail {
    int id;
    int category_id;
    int user_id;
    String title;
    String thumbnail;
    String brief;
    String description;
    int flag;
    int status;
    LocalDate date;
    String author;

    public blog_detail() {
    }

    public blog_detail(int id, int category_id, int user_id, String title, String thumbnail, String brief, String description, int flag, int status, LocalDate date, String author) {
        this.id = id;
        this.category_id = category_id;
        this.user_id = user_id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.brief = brief;
        this.description = description;
        this.flag = flag;
        this.status = status;
        this.date = date;
        this.author = author;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCategory_id() {
        return category_id;
    }

    public void setCategory_id(int category_id) {
        this.category_id = category_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public String getBrief() {
        return brief;
    }

    public void setBrief(String brief) {
        this.brief = brief;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getFlag() {
        return flag;
    }

    public void setFlag(int flag) {
        this.flag = flag;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    @Override
    public String toString() {
        return "blog_detail{" + "id=" + id + ", category_id=" + category_id + ", user_id=" + user_id + ", title=" + title + ", thumbnail=" + thumbnail + ", brief=" + brief + ", description=" + description + ", flag=" + flag + ", status=" + status + ", date=" + date + ", author=" + author + '}';
    }
    
}
