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
@Table(name = "book_tag")
@NamedQueries({
    @NamedQuery(name = "BookTag.findAll", query = "SELECT b FROM BookTag b"),
    @NamedQuery(name = "BookTag.findById", query = "SELECT b FROM BookTag b WHERE b.id = :id"),
    @NamedQuery(name = "BookTag.findByIdBook", query = "SELECT b FROM BookTag b WHERE b.idBook = :idBook"),
    @NamedQuery(name = "BookTag.findByIdTag", query = "SELECT b FROM BookTag b WHERE b.idTag = :idTag")})
public class BookTag implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @Column(name = "id_book")
    private int idBook;
    @Basic(optional = false)
    @Column(name = "id_tag")
    private int idTag;
    @JoinColumn(name = "idBook", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Book idBook1;
    @JoinColumn(name = "idTag", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Tag idTag1;

    public BookTag() {
    }

    public BookTag(Integer id) {
        this.id = id;
    }

    public BookTag(Integer id, int idBook, int idTag) {
        this.id = id;
        this.idBook = idBook;
        this.idTag = idTag;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getIdBook() {
        return idBook;
    }

    public void setIdBook(int idBook) {
        this.idBook = idBook;
    }

    public int getIdTag() {
        return idTag;
    }

    public void setIdTag(int idTag) {
        this.idTag = idTag;
    }

    public Book getIdBook1() {
        return idBook1;
    }

    public void setIdBook1(Book idBook1) {
        this.idBook1 = idBook1;
    }

    public Tag getIdTag1() {
        return idTag1;
    }

    public void setIdTag1(Tag idTag1) {
        this.idTag1 = idTag1;
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
        if (!(object instanceof BookTag)) {
            return false;
        }
        BookTag other = (BookTag) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.ttn.pojo.BookTag[ id=" + id + " ]";
    }
    
}
