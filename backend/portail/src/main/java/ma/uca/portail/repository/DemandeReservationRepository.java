package ma.uca.portail.repository;

import ma.uca.portail.model.DemandeReservation;
import ma.uca.portail.model.DemandeReservation.Statut;
import ma.uca.portail.model.DemandeReservation.TypeSalle;
import ma.uca.portail.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface DemandeReservationRepository extends JpaRepository<DemandeReservation, Long> {

    // Demandes d'un organisateur
    List<DemandeReservation> findByOrganisateur(Utilisateur organisateur);

    // Demandes par statut
    List<DemandeReservation> findByStatut(Statut statut);

    // Comptage par statut (dashboard)
    long countByStatut(Statut statut);

    // Demandes d'un organisateur filtrées par statut
    List<DemandeReservation> findByOrganisateurAndStatut(
            Utilisateur organisateur, Statut statut);

    // Demandes par date (vue journalière admin)
    List<DemandeReservation> findByDate(LocalDate date);

    // Demandes par salle
    List<DemandeReservation> findBySalle(TypeSalle salle);

    // Conflits : même salle + date + créneau, statut != REFUSÉ
    @Query("""
        SELECT d FROM DemandeReservation d
        WHERE d.salle   = :salle
          AND d.date    = :date
          AND d.creneau = :creneau
          AND d.statut != 'REFUSÉ'
        ORDER BY d.dateSoumission
    """)
    List<DemandeReservation> findConflits(
            @Param("salle")   TypeSalle salle,
            @Param("date")    LocalDate date,
            @Param("creneau") String    creneau);

    // Vérifier si une salle est occupée à une date/créneau donnés
    @Query("""
        SELECT COUNT(d) > 0 FROM DemandeReservation d
        WHERE d.salle   = :salle
          AND d.date    = :date
          AND d.creneau = :creneau
          AND d.statut  = 'CONFIRMÉ'
    """)
    boolean isSalleOccupee(
            @Param("salle")   TypeSalle salle,
            @Param("date")    LocalDate date,
            @Param("creneau") String    creneau);
}
