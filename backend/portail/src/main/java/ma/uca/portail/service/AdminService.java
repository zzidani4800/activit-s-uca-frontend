package ma.uca.portail.service;

import lombok.RequiredArgsConstructor;
import ma.uca.portail.dto.DemandeReservationDtos;
import ma.uca.portail.dto.UtilisateurDtos;
import ma.uca.portail.exception.NotFoundException;
import ma.uca.portail.model.DemandeReservation;
import ma.uca.portail.model.DemandeReservation.Statut;
import ma.uca.portail.model.Utilisateur;
import ma.uca.portail.repository.DemandeReservationRepository;
import ma.uca.portail.repository.UtilisateurRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UtilisateurRepository        utilisateurRepo;
    private final DemandeReservationRepository demandeRepo;
    private final ReservationService           reservationService;

    // ── Dashboard ─────────────────────────────────────────

    @Transactional(readOnly = true)
    public Map<String, Object> getStats() {

        long total      = demandeRepo.count();
        long enAttente  = demandeRepo.countByStatut(Statut.EN_ATTENTE);
        long confirmees = demandeRepo.countByStatut(Statut.CONFIRMÉ);
        long refusees   = demandeRepo.countByStatut(Statut.REFUSÉ);

        double taux = total > 0
            ? Math.round((confirmees * 100.0 / total) * 10.0) / 10.0
            : 0;

        // Conflits : même salle + date + créneau, statut != REFUSÉ
        long conflits = demandeRepo.findAll().stream()
            .filter(d -> d.getStatut() != Statut.REFUSÉ)
            .collect(Collectors.groupingBy(
                d -> d.getSalle() + "|" +
                     d.getDate()  + "|" +
                     d.getCreneau(),
                Collectors.counting()))
            .values().stream()
            .filter(count -> count > 1)
            .count();

        Map<String, Object> stats = new LinkedHashMap<>();
        stats.put("demandesTotal",    total);
        stats.put("enAttente",        enAttente);
        stats.put("confirmees",       confirmees);
        stats.put("refusees",         refusees);
        stats.put("tauxApprobation",  taux + "%");
        stats.put("conflitsDetectes", conflits);
        return stats;
    }

    // ── Réservations ──────────────────────────────────────

    @Transactional(readOnly = true)
    public List<DemandeReservationDtos.DemandeResume> toutesLesDemandes() {
        return reservationService.toutesLesDemandes();
    }

    @Transactional(readOnly = true)
    public List<DemandeReservationDtos.DemandeResume> enAttente() {
        return reservationService.enAttente();
    }

    @Transactional
    public DemandeReservationDtos.DemandeResponse changerStatut(
            Long id,
            DemandeReservation.Statut decision,
            String motif) {
        return reservationService.changerStatut(id, decision, motif);
    }

    // ── Gestion utilisateurs ──────────────────────────────

    @Transactional(readOnly = true)
    public List<UtilisateurDtos.UtilisateurResponse> listerUtilisateurs() {
        return utilisateurRepo.findAll().stream()
                .map(UtilisateurDtos.UtilisateurResponse::from)
                .toList();
    }

    @Transactional
    public UtilisateurDtos.UtilisateurResponse modifierUtilisateur(
            Long id, UtilisateurDtos.UpdateRequest req) {

        Utilisateur u = utilisateurRepo.findById(id)
                .orElseThrow(() ->
                    new NotFoundException("Utilisateur introuvable"));

        if (req.getPrenom() != null) u.setPrenom(req.getPrenom());
        if (req.getNom()    != null) u.setNom(req.getNom());
        if (req.getRole()   != null) u.setRole(req.getRole());

        return UtilisateurDtos.UtilisateurResponse
                .from(utilisateurRepo.save(u));
    }

    @Transactional
    public void supprimerUtilisateur(Long id) {
        if (!utilisateurRepo.existsById(id))
            throw new NotFoundException("Utilisateur introuvable");
        utilisateurRepo.deleteById(id);
    }
}