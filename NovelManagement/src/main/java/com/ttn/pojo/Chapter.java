/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ttn.pojo;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedQueries;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;
import java.io.Serializable;

/**
 *
 * @author Admin
 */
@Entity
@Table(name = "chapter")
@NamedQueries({
    @NamedQuery(name = "Chapter.findAll", query = "SELECT c FROM Chapter c"),
    @NamedQuery(name = "Chapter.findById", query = "SELECT c FROM Chapter c WHERE c.id = :id"),
    @NamedQuery(name = "Chapter.findByName", query = "SELECT c FROM Chapter c WHERE c.name = :name"),
    @NamedQuery(name = "Chapter.findByIdBook", query = "SELECT c FROM Chapter c WHERE c.idBook = :idBook")})
public class Chapter implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Column(name = "name")
    private String name;
    @Lob
    @Column(name = "content")
    private String content;
    @Basic(optional = false)
    @Column(name = "id_book")
    private int idBook;
    @JoinColumn(name = "idBook", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Book idBook1;

    public Chapter() {
    }

    public Chapter(Integer id) {
        this.id = id;
    }

    public Chapter(Integer id, int idBook) {
        this.id = id;
        this.idBook = idBook;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getIdBook() {
        return idBook;
    }

    public void setIdBook(int idBook) {
        this.idBook = idBook;
    }

    public Book getIdBook1() {
        return idBook1;
    }

    public void setIdBook1(Book idBook1) {
        this.idBook1 = idBook1;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Chapter)) {
            return false;
        }
        Chapter other = (Chapter) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.ttn.pojo.Chapter[ id=" + id + " ]";
    }
    
}
