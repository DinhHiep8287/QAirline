package org.example.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.example.constant.Role;

@Table(name = "USER")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class User extends BaseObject{
    @Column(name = "EMAIL", nullable = false, unique = true)
    private String email;

    @Column(name = "PASSWORD", nullable = false)
    @JsonIgnore
    private String password;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "ID_NUMBER", nullable = false)
    private String IdNumber;

    @Column(name = "ROLE", nullable = false)
    private Role role = Role.USER;

    @Column(name = "IS_FORGOTTEN", nullable = false)
    private boolean isForgotten;
}
