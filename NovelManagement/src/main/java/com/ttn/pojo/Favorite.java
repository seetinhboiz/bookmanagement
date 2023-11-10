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
@Table(name = "favorite")
@NamedQueries({
    @NamedQuery(name = "Favorite.findAll", query = "SELECT f FROM Favorite f"),
    @NamedQuery(name = "Favorite.findById", query = "SELECT f FROM Favorite f WHERE f.id = :id"),
    @NamedQuery(name = "Favorite.findByIdBook", query = "SELECT f FROM Favorite f WHERE f.idBook = :idBook"),
    @NamedQuery(name = "Favorite.findByIdBook1", query = "SELECT f FROM Favorite f WHERE f.idBook1 = :idBook1"),
    @NamedQuery(name = "Favorite.findByIdUser", query = "SELECT f FROM Favorite f WHERE f.idUser = :idUser")})
public class Favorite implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Column(name = "idBook")
    private Integer idBook;
    @Column(name = "id_book")
    private Integer idBook1;
    @Basic(optional = false)
    @Column(name = "id_user")
    private int idUser;
    @JoinColumn(name = "idUser", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private User idUser1;

    public Favorite() {
    }

    public Favorite(Integer id) {
        this.id = id;
    }

    public Favorite(Integer id, int idUser) {
        this.id = id;
        this.idUser = idUser;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getIdBook() {
        return idBook;
    }

    public void setIdBook(Integer idBook) {
        this.idBook = idBook;
    }

    public Integer getIdBook1() {
        return idBook1;
    }

    public void setIdBook1(Integer idBook1) {
        this.idBook1 = idBook1;
    }

    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }

    public User getIdUser1() {
        return idUser1;
    }

    public void setIdUser1(User idUser1) {
        this.idUser1 = idUser1;
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
        if (!(object instanceof Favorite)) {
            return false;
        }
        Favorite other = (Favorite) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.ttn.pojo.Favorite[ id=" + id + " ]";
    }
    
}
