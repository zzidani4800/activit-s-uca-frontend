package ma.uca.portail.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import ma.uca.portail.model.Utilisateur;

// ─────────────────────────────────────────────────────────────────────────────
//  DTOs d'Authentification
// ─────────────────────────────────────────────────────────────────────────────

public class AuthDtos {

    /** Requête de connexion (étudiant ou admin) */
    @Data
    public static class LoginRequest {
        @Email @NotBlank
        private String email;
        @NotBlank
        private String motDePasse;
    }

    /** Réponse JWT après connexion */
    @Data @lombok.AllArgsConstructor
    public static class LoginResponse {
        private String token;
        private String type = "Bearer";
        private Long id;
        private String nom;
        private String email;
        private Utilisateur.Role role;
    }

    /** Inscription d'un nouvel utilisateur */
    @Data
    public static class RegisterRequest {
        @NotBlank private String prenom;
        @NotBlank private String nom;
        @Email @NotBlank private String email;
        @NotBlank @Size(min = 6) private String motDePasse;
        private String numeroEtudiant;
        private Utilisateur.Role role;
        private Utilisateur.Departement departement;
    }
}