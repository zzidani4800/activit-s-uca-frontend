package ma.uca.portail.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Future;
import lombok.Data;
import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import ma.uca.portail.model.DemandeReservation;

import java.time.LocalDate;

public class DemandeReservationDtos {

    // ── Soumission formulaire ────────────────────────────
    @Data
    public static class DemandeRequest {

        @NotNull
        private DemandeReservation.Departement departement;

        @NotBlank
        private String titreEvenement;

        @NotNull
        private DemandeReservation.TypeEvenement typeEvenement;

        private String description;

        @NotNull
        private DemandeReservation.TypeSalle salle;

        @NotNull
        @Future
        private LocalDate date;

        @NotBlank
        private String creneau;

        @NotBlank
        private String motivation;
    }

    // ── Décision admin ───────────────────────────────────
    @Data
    public static class DecisionRequest {

        @NotNull
        private DemandeReservation.Statut decision;

        private String motif;
    }

    // ── Réponse complète ─────────────────────────────────
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DemandeResponse {

        private Long   id;
        private Long   organisateurId;
        private String organisateurNom;
        private String organisateurEmail;
        private String departement;
        private String titreEvenement;
        private String typeEvenement;
        private String description;
        private String salle;
        private String date;
        private String creneau;
        private String motivation;
        private String statut;
        private String motifRefus;
        private String dateDecision;
        private String dateSoumission;

        public static DemandeResponse from(DemandeReservation d) {
            return DemandeResponse.builder()
                    .id(d.getId())
                    .organisateurId(d.getOrganisateur().getId())
                    .organisateurNom(
                        d.getOrganisateur().getPrenom() + " " +
                        d.getOrganisateur().getNom())
                    .organisateurEmail(d.getOrganisateur().getEmail())
                    .departement(d.getDepartement().getLibelle())
                    .titreEvenement(d.getTitreEvenement())
                    .typeEvenement(d.getTypeEvenement().name())
                    .description(d.getDescription())
                    .salle(d.getSalle().name())
                    .date(d.getDate().toString())
                    .creneau(d.getCreneau())
                    .motivation(d.getMotivation())
                    .statut(d.getStatut().name())
                    .motifRefus(d.getMotifRefus())
                    .dateDecision(d.getDateDecision() != null
                            ? d.getDateDecision().toString() : null)
                    .dateSoumission(d.getDateSoumission() != null
                            ? d.getDateSoumission().toString() : null)
                    .build();
        }
    }

    // ── Résumé liste dashboard ───────────────────────────
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DemandeResume {

        private Long    id;
        private String  organisateurNom;
        private String  departement;
        private String  titreEvenement;
        private String  typeEvenement;
        private String  salle;
        private String  date;
        private String  creneau;
        private String  statut;
        private boolean enConflit;

        public static DemandeResume from(DemandeReservation d,
                                          boolean enConflit) {
            return DemandeResume.builder()
                    .id(d.getId())
                    .organisateurNom(
                        d.getOrganisateur().getPrenom() + " " +
                        d.getOrganisateur().getNom())
                    .departement(d.getDepartement().getLibelle())
                    .titreEvenement(d.getTitreEvenement())
                    .typeEvenement(d.getTypeEvenement().name())
                    .salle(d.getSalle().name())
                    .date(d.getDate().toString())
                    .creneau(d.getCreneau())
                    .statut(d.getStatut().name())
                    .enConflit(enConflit)
                    .build();
        }
    }
}
